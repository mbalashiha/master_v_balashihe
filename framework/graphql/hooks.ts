import { API } from "@common/types";

import { handler as useSendEmail } from "@framework/site/contact/use-send-email";
import { handler as useSendRequest } from "@framework/site/contact/use-send-request";
import { handler as useCountViews } from "@framework/site/use-count-views";
export const graphqlHooks: API.SiteHooks = {
  site: {
    contact: {
      useSendEmail,
      useSendRequest,
    },
    useCountViews,
  },
};
