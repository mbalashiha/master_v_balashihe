/* eslint-disable react-hooks/rules-of-hooks */
import { useSaveArticleText } from "@common/management/blog/draft/use-save-article-text";
import { UseSaveArticleText } from "@common/management/blog/draft/use-save-article-text";
import { API, CMS } from "@common/types";
import { Management } from "@common/types/cms";
import { useRefFormik } from "@components/ui";
import { Schema } from "@framework/types";
import { saveArticleTextDraft } from "./mutations/save-article-text-draft";
import { normalizeArticleDraft } from "./normalize";

export default useSaveArticleText as UseSaveArticleText<typeof handler>;

export interface UseSaveArticleTextHook {
  requestInput: { articleTextDraft: Schema.ArticleTextDraftInput };
  requestOutput: Schema.ArticleTextDraftInput;
  data: CMS.Blog.ArticleDraft;
}
export const handler: API.Graphql.MutationHook<UseSaveArticleTextHook> = {
  requestOptions: {
    query: saveArticleTextDraft,
  },
  async request({ request, options, input }) {
    try {
      const variables = input;
      const data = await request({ ...options, variables });
      return data as any;
      //const normalized = normalizeArticleDraft(data.articleDraft);
      //return normalized;
    } catch (e: any) {
      console.error(e);
      debugger;
      throw e;
    }
  },
  useHook: ({ request }) => {
    const form = useRefFormik<CMS.Blog.ArticleDraft>();
    return () => async (input) => {
      const initial = form.getInitialValues();
      const draft = input.articleTextDraft;
      if (
        (draft.textHtml || "") != (initial.textHtml || "") ||
        (draft.textRawDraftContentState || "") !=
          (initial.textRawDraftContentState || "")
      ) {
        const response = await request(input);
        if (response) {
          // mutate({ ...response }, false);
        }
        return response as any;
      } else {
        return initial as any;
      }
    };
  },
};
