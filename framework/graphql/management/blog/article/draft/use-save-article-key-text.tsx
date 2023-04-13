/* eslint-disable react-hooks/rules-of-hooks */
import { useSaveArticleKeyText } from "@common/management/blog/article/draft/use-save-article-key-text";
import type { UseSaveArticleKeyText } from "@common/management/blog/article/draft/use-save-article-key-text";
import { API, CMS } from "@common/types";
import { useRefFormik } from "@components/ui";
import { Schema } from "@framework/types";
import { articleKeyTextDraft } from "./mutations/save-article-key-text-draft";
import { normalizeArticleDraft } from "./normalize";
import useArticleDraft from "./use-article-draft";

export default useSaveArticleKeyText as UseSaveArticleKeyText<typeof handler>;

export interface UseSaveArticleKeyTextHook {
  requestInput: Partial<{
    articleKeyText: Schema.Article.ArticleKeyTextDraftInput;
  }>;
  requestOutput: Schema.Response.SaveArticleKeyTextDraftResponse;
  data: CMS.Blog.ArticleDraft;
}
export const handler: API.Graphql.MutationHook<UseSaveArticleKeyTextHook> = {
  requestOptions: {
    query: articleKeyTextDraft,
  },
  async request({ request, options, input }) {
    try {
      const variables = input;
      const data = await request({ ...options, variables });
      const normalized = normalizeArticleDraft(
        data.saveArticleKeyTextDraft.updatedDraft
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
        articleKeyText: {
          ...input?.articleKeyText,
          id: all?.id || null,
          existingArticleId: all?.existingArticleId || null,
          keyTextHtml: all?.keyTextHtml || "",
        },
      };
      const draft = inputObj.articleKeyText;
      const needToUpdate =
        (draft.keyTextHtml || "") != (initial.keyTextHtml || "");
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
