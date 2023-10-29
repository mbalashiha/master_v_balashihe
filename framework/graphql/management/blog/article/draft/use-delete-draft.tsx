/* eslint-disable react-hooks/rules-of-hooks */
import { useDeleteDraft } from "@common/management/blog/article/draft/use-delete-draft";
import { UseDeleteDraft } from "@common/management/blog/article/draft/use-delete-draft";
import { API, CMS } from "@common/types";
import { ID, Schema } from "@framework/types";
import { normalizeArticleDraft } from "../../../../utils/normalize/normalize-article-draft";
import { slugify } from "lib";
import { useSnackbar } from "notistack";
import useArticleDraft from "./use-article-draft";
import { deleteArticleDraft } from "./mutations/delete-article-draft";
import { useRefFormik } from "@components/ui";
export default useDeleteDraft as UseDeleteDraft<typeof handler>;

export interface UseDeleteDraftHook {
  requestInput: { id: ID };
  requestOutput: Schema.Response.DeleteArticleDraftResponse;
  data: {
    draft?: CMS.Blog.ArticleDraft;
    success: Boolean;
    error?: string | null;
    message?: string | null;
  };
}
export const handler: API.Graphql.MutationHook<UseDeleteDraftHook> = {
  requestOptions: {
    query: deleteArticleDraft,
  },
  async request({ request, options, input }) {
    try {
      const variables = input;
      const data = await request({ ...options, variables });
      const result = data.deleteArticleDraft;
      let draft;
      const { success, error, message } = result;
      if (result.updatedDraft) {
        draft = normalizeArticleDraft(result.updatedDraft);
      }
      return { draft, success, error, message };
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      return {
        success: false,
        message: e.stack || e.message || e,
        error: e.stack || e.message || e,
      };
    }
  },
  useHook: ({ request }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { mutate: updateDraft } = useArticleDraft();
    const form = useRefFormik<CMS.Blog.ArticleDraft>();
    return () => async (input) => {
      const response = await request(input);
      if (response.success && response.draft) {
        await updateDraft(response.draft, false);
      } else {
        enqueueSnackbar(
          (response.error || response.message || "Error occured").substring(
            0,
            312
          ),
          {
            variant: "error",
          }
        );
      }
      return response;
    };
  },
};
