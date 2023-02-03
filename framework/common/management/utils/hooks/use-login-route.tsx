import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";
import { AFTER_LOGIN_BACKTO_URI } from "@framework/const";
export const managerLoginUrl = "/management/login";
import util from "util";

const useLoginRoute = () => {
  const router = useRouter();
  const toLoginPage = React.useCallback(
    () => {
      try {
        const fullCurrentPath = router.asPath;
        if (router.pathname !== managerLoginUrl) {
          Cookies.set(AFTER_LOGIN_BACKTO_URI, fullCurrentPath);
          router.push(managerLoginUrl, managerLoginUrl);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [router]
  );
  return { toLoginPage };
};

export default useLoginRoute;
