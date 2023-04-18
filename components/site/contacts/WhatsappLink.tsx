import {
  NEXT_PUBLIC_WHATSAPP_LINK,
  NEXT_PUBLIC_CONTACT_PHONE_NUMBER,
  NEXT_PUBLIC_TELEGRAM_LINK,
} from "@framework/const";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export const WhatsappLink = ({ children }: Props) => {
  return (
    <a href={NEXT_PUBLIC_WHATSAPP_LINK} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};
export default WhatsappLink;
