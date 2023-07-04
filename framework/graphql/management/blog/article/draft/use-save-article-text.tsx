/* eslint-disable react-hooks/rules-of-hooks */
import { useSaveArticleText } from "@common/management/blog/article/draft/use-save-article-text";
import { UseSaveArticleText } from "@common/management/blog/article/draft/use-save-article-text";
import { API, CMS } from "@common/types";
import { useRefFormik } from "@components/ui";
import { Schema } from "@framework/types";
import { articleTextDraft } from "./mutations/save-article-text-draft";
import { normalizeArticleDraft } from "../../../../utils/normalize/normalize-article-draft";
import useArticleDraft from "./use-article-draft";

export default useSaveArticleText as UseSaveArticleText<typeof handler>;

export interface UseSaveArticleTextHook {
  requestInput: Partial<{ articleTextDraft: Schema.Article.TextDraftInput }>;
  requestOutput: Schema.Response.SaveArticleTextDraftResponse;
  data: CMS.Blog.ArticleDraft;
}
export const handler: API.Graphql.MutationHook<UseSaveArticleTextHook> = {
  requestOptions: {
    query: articleTextDraft,
  },
  async request({ request, options, input }) {
    try {
      const variables = input;
      const data = await request({ ...options, variables });
      const normalized = normalizeArticleDraft(
        data.saveArticleTextDraft.updatedDraft
      );
      return normalized;
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      // alert(e.stack || e.message || e);
      throw e;
    }
  },
  useHook: ({ request }) => {
    const form = useRefFormik<CMS.Blog.ArticleDraft>();
    const { mutate: updateDraft } = useArticleDraft();
    return () => async (input) => {
      const initial = form.getInitialValues();
      const all = form.getValues();
      const inputObj = {
        ...input,
        articleTextDraft: {
          ...input?.articleTextDraft,
          id: all?.id || null,
          existingArticleId: all?.existingArticleId || null,
          text: all?.text || "",
          textHtml: all?.textHtml || "",
          textRawDraftContentState: null,
        },
      };
      const draft = inputObj.articleTextDraft;
      const needToUpdate =
        (draft.text || "") != (initial.text || "") ||
        (draft.textHtml || "") != (initial.textHtml || "") ||
        (draft.textRawDraftContentState || "") !=
          (initial.textRawDraftContentState || "");
      if (needToUpdate) {
        const response = await request(inputObj);
        form.setInitialValues({ ...response });
        form.setFieldValue("id", response.id);
        await updateDraft({ ...response }, false);
        return response;
      } else {
        return initial;
      }
    };
  },
};
