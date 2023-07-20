
import useSendEmail, { UseSendEmail } from "@common/site/contact/use-send-email";
import { API } from "@common/types";
import { Management } from "@common/types/cms";
import { WizValues } from "@components/site/contacts/Wizard/Step";
import { CONTACT_API_URL } from "@framework/const";
import Cookies from "js-cookie";

export default useSendEmail as UseSendEmail<typeof handler>;

export interface SendEmailHook {
  requestInput: WizValues;
  requestOutput: Management.ManagerTokenResponse;
  data: Management.ManagerTokenResponse;
}
export const handler: API.RestApi.RestApiHook<SendEmailHook> = {
  options: {
    url: CONTACT_API_URL,
    enc: true,
  },
  restRequest: async ({ restRequest, input, options }) => {
    try {
      const { data, status } = await restRequest({
        ...options,
        variables: input,
      });
      debugger;
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
