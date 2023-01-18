export const API_ORIGIN: string = process.env.NEXT_PUBLIC_API_ORIGIN!;
if (!API_ORIGIN) {
  throw new Error("No enviroment variable NEXT_PUBLIC_API_ORIGIN");
}
if (!process.env.NEXT_PUBLIC_LOGIN_API_TEST_AUTH_URL) {
  throw new Error("No enviroment variable NEXT_PUBLIC_LOGIN_API_TEST_AUTH_URL");
};
if (!process.env.NEXT_PUBLIC_MANAGEMENT_LOGIN_API_URL) {
  throw new Error(
    "No enviroment variable NEXT_PUBLIC_MANAGEMENT_LOGIN_API_URL"
  );
}
export const MANAGEMENT_LOGIN_API_URL: string =
  API_ORIGIN + process.env.NEXT_PUBLIC_MANAGEMENT_LOGIN_API_URL;
export const API_URL: string = API_ORIGIN + process.env.NEXT_PUBLIC_API_URL!;
export const LOGIN_API_URL: string =
  API_ORIGIN + process.env.NEXT_PUBLIC_LOGIN_API_URL!;
export const LOGIN_SIGN_OUT_API_URL: string =
  API_ORIGIN + process.env.NEXT_PUBLIC_LOGIN_SIGN_OUT_API_URL!;
export const AFTER_LOGIN_BACKTO_URI = "after_login_backto_uri";
export const TEST_AUTH_URL: string =
  API_ORIGIN + process.env.NEXT_PUBLIC_LOGIN_API_TEST_AUTH_URL!;
if (!TEST_AUTH_URL) {
  throw new Error("No enviroment variable NEXT_PUBLIC_LOGIN_API_TEST_AUTH_URL");
}
if (!API_URL) {
  throw new Error("No enviroment variable NEXT_PUBLIC_API_URL");
}
if (!LOGIN_API_URL) {
  throw new Error("No enviroment variable NEXT_PUBLIC_LOGIN_API_URL");
}
export const API_USER_TOKEN_COOKIE: string = "signin";
export const SITE_LOCALE = "ru-RU";
export const SHOP_CHECKOUT_ID_COOKIE =
  process.env.NEXT_PUBLIC_FRAMEWORK === "graphql_local"
    ? "shop_local_checkoutId"
    : "shop_checkoutId";
export const SHOP_CHECKOUT_URL_COOKIE = "shop_checkoutUrl";
export const SHOP_COOKIE_EXPIRE = 90;
export const CURRENT_SYSTEM_PALETTE_MODE_COOKIE =
  "CURRENT_SYSTEM_PALETTE_MODE_COOKIE";
export const MANUAL_PALETTE_MODE_COOKIE = "MANUAL_PALETTE_MODE_COOKIE";
