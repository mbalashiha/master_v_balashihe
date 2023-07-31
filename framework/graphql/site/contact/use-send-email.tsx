import useSendEmail, {
  UseSendEmail,
} from "@common/site/contact/use-send-email";
import { API } from "@common/types";
import { Management, Site } from "@common/types/cms";
import { WizValues } from "@components/site/contacts/Wizard/Providers";
import { CONTACT_API_URL } from "@framework/const";
import Cookies from "js-cookie";

export default useSendEmail as UseSendEmail<typeof handler>;

export interface SendEmailHook {
  requestInput: WizValues;
  requestOutput: Site.ContactEmailResponse;
  data: Site.ContactEmailOut;
}
export const handler: API.RestApi.RestApiHook<SendEmailHook> = {
  options: {
    url: CONTACT_API_URL,
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
