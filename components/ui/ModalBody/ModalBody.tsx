import React, { FC, useRef, useEffect } from "react";
import {
  disableBodyScroll as __disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import {
  Typography,
  IconButton,
  Stack,
  styled,
  Modal,
  Button,
  Box,
} from "@mui/material";
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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const StyledModalBody = styled(
  React.forwardRef(function StyledModalBody(
    { children, ...props },
    forwardingRef
  ) {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (ref.current && ref.current.style) {
        ref.current.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
        ref.current.style.opacity = "1";
      }
    }, []);
    return (
      <Box {...props} ref={ref}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ref: forwardingRef });
          } else {
            return child;
          }
        })}
      </Box>
    );
  })
)(({ theme }) => ({
  "& form": {
    tabIndex: 1,
  },
  position: "absolute",
  top: "50%",
  left: "50%",
  opacity: "0",
  transition: "transform 220ms linear, opacity 220ms linear",
  transform: "translate3d(-50%, -50%, 0) scale(0.05)",
  margin: "auto",
  width: "95vw",
  boxShadow: "0 0 76px rgb(13 70 144 / 7%), 0 0 10px rgb(0 0 0 / 10%)",
  [theme.breakpoints.up("sm")]: {
    width: "85vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "700px",
  },
  background: theme.palette.background.paper,
  "& > section": {
    padding: "2rem",
  },
  "& > header": {
    paddingLeft: "2rem",
  },
  borderRadius: "0.4rem",
  overflow: "visible",
}));

interface Props {
  children: React.ReactNode | React.ReactNode[];
  open?: boolean;
  onClose: () => void;
  titleText?: string;
  titleElement?: React.ReactNode | React.ReactNode[];
}
const ModalBody = React.forwardRef<FC<Props>, Props>(function ModalBody(
  { children, titleText, titleElement, open, onClose }: Props,
  ref
) {
  return (
    <StyledModalBody>
      <header>
        <Stack
          height={"3.3rem"}
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          overflow="visible"
        >
          {(titleText && (
            <Typography
              variant="h6"
              component="h2"
              sx={{
                py: 0,
                px: 0,
                pt: 1,
                fontSize: "16pt",
                lineHeight: "16pt",
                height: "16pt",
                textTransform: "uppercase",
              }}
            >
              {titleText}
            </Typography>
          )) || <>{titleElement}</>}
          <Box
            width="3.3rem"
            height="3.3rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              background: (theme) => theme.palette.primary.main,
              borderRadius: "0 0.4rem 0 0.43rem",
              boxShadow: "1px -1px 2px 0 rgba(0,0,0,0.3)",
            }}
          >
            <IconButton
              onClick={onClose}
              ref={ref as any}
              sx={{
                "&:hover": {
                  background: "rgba(0,0,0,0.2)",
                },
              }}
            >
              <CloseRoundedIcon
                sx={{
                  color: "white",
                  fontSize: "2rem",
                }}
              />
            </IconButton>
          </Box>
        </Stack>
      </header>
      <section>{children}</section>
    </StyledModalBody>
  );
});
export default ModalBody;
