import { ReactNode, FC } from "react";
import Ticker from "react-ticker";
import s from "./Marquee.module.scss";

interface Props {
  children: ReactNode[];
}

const Marquee: FC<Props> = ({ children }) => {
  return <Ticker>{() => <div className={s.container}>{children}</div>}</Ticker>;
};

export default Marquee;
