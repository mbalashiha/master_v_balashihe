/* eslint-disable react-hooks/rules-of-hooks */
import { useSaveArtDraftProps } from "@common/management/blog/article/draft/use-save-draft-props";
import { UseSaveArtDraftProps } from "@common/management/blog/article/draft/use-save-draft-props";
import { API, CMS } from "@common/types";
import { useRefFormik } from "@components/ui";
import { Schema } from "@framework/types";
import { saveArticleDraft } from "./mutations/save-draft-props";
import { normalizeArticleDraft } from "./normalize";
import useArticleDraft from "./use-article-draft";

export default useSaveArtDraftProps as UseSaveArtDraftProps<typeof handler>;

export interface UseSaveArtDraftPropsHook {
  requestInput: Partial<{ articleDraft: Schema.Article.ArticleDraftInput }>;
  requestOutput: Schema.Response.SaveArtDraftPropsResponse;
  data: CMS.Blog.ArticleDraft;
}
export const handler: API.Graphql.MutationHook<UseSaveArtDraftPropsHook> = {
  requestOptions: {
    query: saveArticleDraft,
  },
  async request({ request, options, input }) {
    try {
      const variables = input;
      const data = await request({ ...options, variables });
      const normalized = normalizeArticleDraft(data);
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
        articleDraft: {
          ...input?.articleDraft,
          id: all?.id || null,
          existingArticleId: all?.existingArticleId || null,
          title: all?.title || null,
          handle: all?.handle || null,
          autoHandleSlug: all?.autoHandleSlug || null,
          published: all?.published ? 1 : null,
          orderNumber: all?.orderNumber || null,
          blogCategoryId: all?.blogCategoryId || null,
        },
      };
      const draft = inputObj.articleDraft;
      const needToUpdate =
        (draft.title || "") != (initial.title || "") ||
        (draft.autoHandleSlug || "") != (initial.autoHandleSlug || "") ||
        (draft.handle || "") != (initial.handle || "") ||
        (draft.blogCategoryId || "") != (initial.blogCategoryId || "") ||
        (draft.published || "") != (initial.published || "") ||
        (draft.orderNumber || "") != (initial.orderNumber || "");
      if (needToUpdate) {
        const response = await request(inputObj);
        form.setInitialValues({ ...draft });
        if (response) {
          await updateDraft({ ...response }, false);
        }
        return response;
      } else {
        return initial;
      }
    };
  },
};
