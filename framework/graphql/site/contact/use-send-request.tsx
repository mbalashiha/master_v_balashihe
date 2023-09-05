import useSendRequest, {
  UseSendRequest,
} from "@common/site/contact/use-send-request";
import { API } from "@common/types";
import { Site } from "@common/types/cms";
import { ContactRequestValues } from "@components/site/contacts/ContactRequest/FormikForRequest";
import { CONTACT_REQUEST_API_URL } from "@framework/const";

export default useSendRequest as UseSendRequest<typeof handler>;

export interface SendRequestHook {
  requestInput: ContactRequestValues;
  requestOutput: Site.ContactEmailResponse;
  data: Site.ContactEmailOut;
}
export const handler: API.RestApi.RestApiHook<SendRequestHook> = {
  options: {
    url: CONTACT_REQUEST_API_URL,
    enc: true,
  },
  restRequest: async ({ restRequest, input, options }) => {
    try {
      const variables = { ...input, timestamp: new Date().getTime() };
      delete variables.privacyChecked;
      const { data, status } = await restRequest({
        ...options,
        variables,
      });
      return { ...data, status };
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
