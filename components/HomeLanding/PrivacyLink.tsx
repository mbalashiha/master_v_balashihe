import Link from "next/link";
import cn from "classnames";

interface Props {
  className?: string;
}
const PrivacyLink = ({ className }: Props) => {
  return (
    <div className={cn(className)}>
      <span>Нажимая кнопку, вы соглашаетесь с</span>&nbsp;
      <Link href="/privacy">политикой конфиденциальности</Link>
    </div>
  );
};
export default PrivacyLink;
