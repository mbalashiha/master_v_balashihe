import { isDark } from "@lib/color";
import Image from "next/image";
import { ChildFriendlyTwoTone } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  FC,
  Children,
  isValidElement,
  default as React,
  useCallback,
  useEffect,
  ComponentProps,
} from "react";
import s from "./ProductSlider.module.scss";
import cn from "classnames";
import { FullScreenSlider } from "./FullScreenSlider";
import { styled } from "@components/ui";
import { Carousel } from "react-responsive-carousel";
import { Box, Paper } from "@components/ui";
import { Portal } from "react-portal";
import { blueGrey } from "@mui/material/colors";

import { IconButton } from "@components/ui";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useAppContext } from "@common/hooks/TheAppContextProvider";
import { PaletteMode } from "@mui/material";
type SliderControlProps = ComponentProps<typeof IconButton> & {
  background?: string | null;
  arrowColor?: string | null;
  mode: PaletteMode;
};
const InPageStyledIconBtn = styled(
  ({
    children,
    background,
    arrowColor,
    mode,
    ...props
  }: SliderControlProps) => {
    return <IconButton {...props}>{children}</IconButton>;
  }
)(({ theme, mode }) => ({
  "&&": {
    zIndex: 2,
    position: "absolute",
    background: mode === "dark" ? "#1E1E1E" : "white",
    top: "1.5rem",
    width: "3.5rem",
    height: "3.5rem",
    padding: 0,
    transition: "all 200ms ease-in-out",
    transform: "scale(1.001)",
    boxShadow: "0 4px 40px rgba(0,0,0,.15)",
    "&:hover": {
      transform: "scale(1.15)",
    },
    "& > *": {
      fontSize: "1.3rem",
      color: mode === "dark" ? "white" : "black",
    },
  },
}));
const InPageSlideBackBtn = styled((props: SliderControlProps) => {
  return (
    <InPageStyledIconBtn {...props}>
      <ArrowBackIosNewRoundedIcon />
    </InPageStyledIconBtn>
  );
})(({ theme }) => ({
  left: 0,
}));
const InPageSlideForwardBtn = styled((props: SliderControlProps) => {
  return (
    <InPageStyledIconBtn {...props}>
      <ArrowForwardIosRoundedIcon />
    </InPageStyledIconBtn>
  );
})<SliderControlProps>(({ theme }) => ({
  right: 0,
}));
const StyledCarousel = styled(Carousel)(({ theme }) => ({
  margin: 0,
  padding: 0,
  width: "35rem",
  [theme.breakpoints.up("xs")]: {
    width: "96vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "47vw",
  },
  [theme.breakpoints.up("xl")]: {
    width: "35rem",
  },
  "& .carousel-slider + .carousel": {
    margin: 0,
    padding: "0.8rem 3.7rem",
  },
  "& .slider-wrapper .slide": {
    cursor: "pointer",
  },
  "& .carousel": {
    "& .carousel-status": {
      top: "auto",
      bottom: "-0.6rem",
      right: "1.4rem",
      fontSize: "11pt",
      [theme.breakpoints.up("md")]: {
        fontSize: "12pt",
      },
      fontFamily: "Roboto, Helvetica, Arial",
      fontWeight: 400,
      textShadow:
        "1px 1px 1px rgb(0 0 0 / 90%), 0px 0px 1px rgb(0 0 0 / 90%), 0px 0px 2px rgb(0 0 0 / 90%)",
    },
    "& .thumbs-wrapper": {
      padding: 0,
      margin: 0,
      borderRadius: "7px",
      overflow: "hidden",
      "& .control-arrow": {
        marginTop: "-11px",
      },
      "& .control-next": {
        right: "3.5rem",
      },
      "& .control-prev": {
        left: "3.5rem",
      },
      "& ul.thumbs": {
        padding: 0,
        margin: 0,
        zIndex: 0,
        height: "80px",
        borderRadius: "7px",
        "& .thumb": {
          padding: 0,
          borderWidth: "4px",
          width: "80px",
          height: "80px",
          background: "grey",
          borderRadius: "7px",
          "& img": {
            borderRadius: "5px",
          },
          borderColor: blueGrey[300],
          "&:hover": {
            borderColor: blueGrey[600],
          },
          "&.selected, &.selected:hover": {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
    "& .control-dots": {
      padding: 0,
      margin: 0,
      marginBottom: "3px",
      "& .dot": {
        width: "0.5rem",
        height: "0.5rem",
        margin: "0 0.4rem",
        background: blueGrey[300],
        opacity: "0.5",
        boxShadow: "none",
        "&.selected": {
          background: theme.palette.primary.main,
          transform: "scale(1.1)",
          transition: "none",
        },
      },
    },
  },
}));
const ProductSlider = ({ children }) => {
  const { theme } = useAppContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [paperBackgroud, setPaperBackground] = React.useState<string | null>(
    null
  );
  const [arrowColor, setArrowColor] = React.useState<string | null>(null);
  const [thumbsContainer, setThumbsContainer] =
    React.useState<HTMLDivElement | null>(null);
  const [sliderWrapper, setSliderWrapper] =
    React.useState<HTMLDivElement | null>(null);
  const onClose = useCallback(() => setIsOpen(false), []);
  const carouselRef = React.useRef<any>(null as any);
  useEffect(() => {
    const onResizeListener = () => {
      const carousel =
        carouselRef.current &&
        (carouselRef.current.carouselWrapperRef as HTMLDivElement);
    };
    const carousel =
      carouselRef.current &&
      (carouselRef.current.carouselWrapperRef as HTMLDivElement);
    if (carousel) {
      const thumbsWrapper = carousel.querySelector(
        ".thumbs-wrapper"
      ) as HTMLDivElement;
      const thumbsContainer =
        thumbsWrapper && (thumbsWrapper.parentNode as HTMLDivElement);
      if (thumbsContainer) {
        const sliderWrapper = carousel.querySelector(
          ".slider-wrapper"
        ) as HTMLDivElement;
        if (sliderWrapper && sliderWrapper.offsetWidth) {
          const selectedSlide = (sliderWrapper.querySelector(
            ".slide.selected > *"
          ) || sliderWrapper.querySelector(".slide > *")) as HTMLDivElement;
          if (selectedSlide) {
            const style = window.getComputedStyle(selectedSlide);
            const background = style.background || style.backgroundColor;
            if (background) {
              sliderWrapper.style.background = background;
              setPaperBackground(background);
              setArrowColor(
                theme?.palette?.mode === "dark" ? "white" : "black"
              );
            }
            if (style.boxShadow) {
              // sliderWrapper.style.boxShadow = style.boxShadow;
              sliderWrapper
                .querySelectorAll(".slide > *")
                .forEach(
                  (inEl: Element, key: number, parent: NodeListOf<Element>) => {
                    const el = inEl as HTMLDivElement;
                    if (el && el.style) {
                      el.style.boxShadow = "none";
                    }
                  }
                );
            }
            sliderWrapper.style.borderRadius = style.borderRadius;
          }
          setSliderWrapper(sliderWrapper);
        }
        setThumbsContainer(thumbsContainer);
      }
    }
    window.addEventListener("resize", onResizeListener);
    return () => window.removeEventListener("resize", onResizeListener);
  }, [sliderWrapper, thumbsContainer, theme?.palette?.mode]);
  return (
    <>
      {thumbsContainer && (
        <Portal node={thumbsContainer}>
          <InPageSlideBackBtn
            background={paperBackgroud}
            arrowColor={arrowColor}
            mode={theme?.palette?.mode}
            onClick={() => carouselRef.current.decrement()}
          ></InPageSlideBackBtn>
          <InPageSlideForwardBtn
            background={paperBackgroud}
            arrowColor={arrowColor}
            mode={theme?.palette?.mode}
            onClick={() => carouselRef.current.increment()}
          ></InPageSlideForwardBtn>
        </Portal>
      )}
      {isOpen && (
        <FullScreenSlider
          selectedItem={carouselRef.current?.state.selectedItem}
          isOpen={isOpen}
          onClose={onClose}
        >
          {children}
        </FullScreenSlider>
      )}
      {Children.count(children) > 1 ? (
        <StyledCarousel
          ref={carouselRef}
          showArrows={false}
          infiniteLoop={true}
          swipeable={true}
          emulateTouch={true}
          showThumbs={true}
          statusFormatter={(currentItem: number, total: number): string => {
            return `${currentItem} из ${total}`;
          }}
          onClickItem={() => setIsOpen(true)}
          renderThumbs={(children) => {
            children = Children.map(children, (child: any) =>
              React.cloneElement(child, { quality: 80 })
            ) as any as React.ReactChild[];
            return children;
          }}
          renderItem={(item, options) => {
            return (
              <Paper
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {item}
              </Paper>
            );
          }}
        >
          {children}
        </StyledCarousel>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            px: { sm: "0.5rem", xl: "1.0rem" },
          }}
        >
          <Paper
            onClick={() => setIsOpen(true)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: 6,
              overflow: "hidden",
              maxWidth: { xl: "500px !important" },
              cursor: "pointer",
            }}
          >
            {children}
          </Paper>
        </Box>
      )}
    </>
  );
};

export default ProductSlider;
