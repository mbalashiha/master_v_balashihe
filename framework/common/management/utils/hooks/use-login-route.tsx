import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";
import {
  AFTER_LOGIN_BACKTO_URI,
  PAGE_MANAGER_LOGIN_URL,
} from "@framework/const";
import util from "util";

const useLoginRoute = () => {
  const router = useRouter();
  const routerRef = React.useRef(router);
  routerRef.current = router;
  const toLoginPage = React.useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const router = routerRef.current;
    try {
      const fullCurrentPath = router.asPath;
      if (router.pathname !== PAGE_MANAGER_LOGIN_URL) {
        Cookies.set(AFTER_LOGIN_BACKTO_URI, fullCurrentPath);
        router.push(PAGE_MANAGER_LOGIN_URL, PAGE_MANAGER_LOGIN_URL);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  return React.useMemo(
    () => ({
      toLoginPage,
    }),
    [toLoginPage]
  );
};

export default useLoginRoute;
