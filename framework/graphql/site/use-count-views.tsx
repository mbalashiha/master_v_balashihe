import useCountViews, { UseCountViews } from "@common/site/use-count-views";
import { API } from "@common/types";
import { COUNT_PAGE_VIEWS_API_URL } from "@framework/const";
import { ID } from "@framework/types";

export default useCountViews as UseCountViews<typeof handler>;

export interface CountViewsHook {
  requestInput: { articleId: ID };
  requestOutput: {};
  data: {};
}
export const handler: API.RestApi.RestApiHook<CountViewsHook> = {
  options: {
    url: COUNT_PAGE_VIEWS_API_URL,
    enc: true,
  },
  restRequest: async ({ restRequest, input, options }) => {
    try {
      const variables = { ...input, timestamp: new Date().getTime() };
      const { data, status } = await restRequest({
        ...options,
        variables,
      });
      return data;
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      throw e;
    }
  },
  useHook: ({ restRequest }) => {
    return () => async (input) => {
      const response = await restRequest(input);
      return response;
    };
  },
};
