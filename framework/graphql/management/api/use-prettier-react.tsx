import { usePrettierReact } from "@common/management/api/use-prettier-react";
import { UsePrettierReact } from "@common/management/api/use-prettier-react";
import { API } from "@common/types";

export default usePrettierReact as UsePrettierReact<typeof handler>;

export interface PrettierReactHook {
  requestInput: {
    textContent: string;
    language: string;
  };
  requestOutput: {
    textContent: string;
    language: string;
  };
  data: {
    textContent: string;
    language: string;
  };
}
export const handler: API.RestApi.RestApiHook<PrettierReactHook> = {
  options: {
    url: "/rest/api/management/prettier-react",
  },
  restRequest: async ({ restRequest, input, options }) => {
    try {
      const { data } = await restRequest({
        ...options,
        variables: input,
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
