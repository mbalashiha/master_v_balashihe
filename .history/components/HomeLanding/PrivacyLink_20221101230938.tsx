import Link from "next/link";

const PrivacyLink = ({ className }) => {
  return (
    <div className={className || ""}>
      <span>Нажимая кнопку, вы соглашаетесь с</span>&nbsp;
      <Link href="/privacy">политикой конфиденциальности</Link>
      <span>
        <u></u>
      </span>
    </div>
  );
};
export default PrivacyLink;
