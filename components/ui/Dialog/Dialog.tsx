
// import {
//   disableBodyScroll as __disableBodyScroll,
//   enableBodyScroll,
//   clearAllBodyScrollLocks,
// } from "b//ody-scroll-lock";
// import type { BodyScrollOptions } from "b//ody-scroll-lock";import { FC, useRef, useEffect } from "react";
import { FC, useRef } from "react";
import { default as BootstrapDialog } from "./BootstrapDialog";
interface Props {
  children: React.ReactNode | React.ReactNode[];
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: FC<Props> = (props: Props) => {
  const { children, isOpen, onClose } = props;
  const ref = useRef<HTMLDivElement | null>(null);
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
