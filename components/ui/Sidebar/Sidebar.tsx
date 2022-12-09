import { FC, useRef, useEffect } from "react";
import {
  disableBodyScroll as __disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { styled, Modal, IconButton, Stack, Button } from "@mui/material";
import type { BodyScrollOptions } from "body-scroll-lock";
const bsOptions: BodyScrollOptions = {
  reserveScrollBarGap: true,
};
const disableBodyScroll = (...args) => {
  const opts: BodyScrollOptions =
    typeof args[1] === "object"
      ? args[1] && (args[1].reserveScrollBarGap = true) && args[1]
      : bsOptions;
  return __disableBodyScroll(args[0], opts);
};

interface Props {
  children: any;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<Props> = (props: Props) => {
  const { children, isOpen, onClose } = props;
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    if (ref.current) {
      if (isOpen) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => clearAllBodyScrollLocks();
  }, [isOpen]);
  return <>{isOpen && <Modal disableEnforceFocus ref={ref} open={isOpen} onClose={onClose}>{children}</Modal>}</>;
};

export default Sidebar;
