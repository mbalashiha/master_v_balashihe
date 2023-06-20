import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";
import { AFTER_LOGIN_BACKTO_URI } from "@framework/const";
import util from "util";

const useFromLogin = () => {
  const router = useRouter();
  const routerRef = React.useRef(router);
  routerRef.current = router;
  const doRedirectAuthorized = React.useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const router = routerRef.current;
      let redirectUrl = Cookies.get(AFTER_LOGIN_BACKTO_URI) || "/management";
      redirectUrl = Array.isArray(redirectUrl)
        ? redirectUrl.join("/")
        : redirectUrl;
      router.replace(redirectUrl, redirectUrl);
    } catch (e) {
      console.error(e);
    }
  }, []);
  return React.useMemo(
    () => ({ doRedirectAuthorized }),
    [doRedirectAuthorized]
  );
};

export default useFromLogin;
