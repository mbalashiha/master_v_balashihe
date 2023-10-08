const formatPhoneForWhatsapp = (inPhone: string): string => {
  inPhone = inPhone.replaceAll(/[^\d]/gim, "");
  if (inPhone.length === 11 && inPhone.startsWith("8")) {
    return `7${inPhone.substring(1)}`;
  } else if (inPhone.length === 10) {
    return `7${inPhone}`;
  } else {
    return inPhone;
  }
};
export const formatWhatsappUrl = (
  props?:
    | {
        CONTACT_PHONE_TEXT: string;
        WHATSAPP_LINK: string;
      }
    | undefined
) => {
  const CONTACT_PHONE_TEXT =
    props?.CONTACT_PHONE_TEXT ||
    process.env["NEXT_PUBLIC_CONTACT_PHONE_TEXT"] ||
    "";
  const WHATSAPP_LINK =
    props?.WHATSAPP_LINK || process.env["NEXT_PUBLIC_WHATSAPP_LINK"] || "";
  return WHATSAPP_LINK.replace(
    "###",
    formatPhoneForWhatsapp(CONTACT_PHONE_TEXT)
  );
};
