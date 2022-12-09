import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode[];
}

const Marquee: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default Marquee;
