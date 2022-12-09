import { FC, useRef, useEffect } from "react";
import {
  disableBodyScroll as __disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import type { BodyScrollOptions } from "body-scroll-lock";
import { default as BootstrapDialog } from "./BootstrapDialog";
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
  children: React.ReactNode | React.ReactNode[];
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: FC<Props> = (props: Props) => {
  const { children, isOpen, onClose } = props;
  const ref = useRef<HTMLDivElement | null>(null);
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
  return (
    <>
      {isOpen ? (
        <BootstrapDialog
          ref={ref}
          open={isOpen}
          onClose={onClose}
          sx={{
            "& .MuiPaper-root": {
              "&, & > *": {
                minWidth: { md: "800px" },
              },
            },
          }}
        >
          {children}
        </BootstrapDialog>
      ) : null}
    </>
  );
};

export default Dialog;
