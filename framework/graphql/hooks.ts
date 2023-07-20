import { API } from "@common/types";

import { handler as useSendEmail } from "@framework/site/contact/use-send-email";
export const graphqlHooks: API.SiteHooks = {
  site: {
    contact: {
      useSendEmail,
    },
  },
};
