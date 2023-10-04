import { CMS } from "@common/types";
import { EnhImage } from "@components/ui";
import { Container, styled } from "@mui/material";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { HeaderTextParser } from "@components/common/HeaderTextParser";
import React, { useMemo } from "react";
import { blueGrey } from "@mui/material/colors";
import cn from "classnames";
import a from "@components/ui/Transitions/animation.module.scss";
import GradientSVG from "public/gradient.svg";
import { RequestComputerMaster } from "@components/site";
import Head from "next/head";

const StyledBox = styled(
  ({ children, sx, ...props }: React.ComponentProps<typeof Paper>) => (
    <Paper component="header" {...props} sx={{ ...sx }}>
      {children}
    </Paper>
  )
)(({ theme }) => ({
  width: "100%",
  padding: "0 4px",
  backgroundColor: "#DFDDDB",
  backgroundImage: `url(/rect111611.webp)`,
  backgroundSize: "100% 100%",
  backgroundPosition: "center center",
  color: `rgb(52, 71, 103)`,
  borderRadius: 0,
  marginBottom: 0,
  overflow: "visible",
  boxShadow: "none",
}));

interface Props {
  children: React.ReactNode | React.ReactNode[];
  image: CMS.Image | null;
  keyTextHtml?: string | null;
}
export const SpecialHeader = ({
  children: inChildren,
  image: inImage,
  keyTextHtml,
}: Props) => {
  const image: CMS.Image = inImage?.url
    ? inImage
    : {
        url: "/images/mfc-balashikha.webp",
        width: 1024,
        height: 1024,
        alt: "",
      };
  const { children, afterContent } = useMemo((): {
    children: typeof inChildren;
    afterContent: string;
  } => {
    if (typeof inChildren === "string") {
      const matched = inChildren.match(/[\?\!\.]$/im);
      if (matched && matched[0]) {
        return { children: inChildren.slice(0, -1), afterContent: matched[0] };
      }
    }
    return { children: inChildren, afterContent: "." };
  }, [inChildren]);
  return (
    <StyledBox
      sx={{
        position: "relative",
      }}
    >
      <Head>
        {typeof children === "string" && children && (
          <meta
            name="description"
            content={`${children} - вызвать частного мастера на дом для ремонта ПК в Балашихе РФ`}
          />
        )}
      </Head>
      <Container maxWidth={"lg"}>
        <Grid
          container
          sx={{
            position: "relative",
            paddingBottom: { xs: "135px", md: "60px" },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minWidth: "400px",
              display: "flex",
              padding: { xs: "60px 0 0 0", md: "60px 0 60px 0" },
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h1"
              itemProp="headline"
              sx={{
                fontSize: { xs: "28px", sm: "44px" },
                lineHeight: { xs: "39px", sm: "62px" },
                fontWeight: 700,
                px: { xs: "9px", sm: 0 },
                zIndex: 1,
                "&:after": {
                  content: `"${afterContent}"`,
                  color: "#F24570",
                  fontSize: { xs: "28px", sm: "44px" },
                  lineHeight: { xs: "39px", sm: "62px" },
                },
              }}
            >
              {children}
            </Typography>
          </Grid>
          {keyTextHtml && (
            <Grid
              item
              xs={12}
              order={2}
              sx={{
                paddingTop: 0,
                paddingBottom: "47px",
                "& > *": {
                  p: 0,
                  m: 0,
                  ml: "30px",
                  "&::before": {
                    display: "inline-block",
                    content: `"\\2605"`,
                    fontSize: "24px",
                    lineHeight: "20px",
                    transform: "translate(-30px,2px)",
                    width: 0,
                    overflow: "visible",
                    color: "orange",
                  },
                },
              }}
            >
              <HeaderTextParser htmlText={keyTextHtml} />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "60px 60px 0 60px",
              zIndex: 2,
              "& img": {
                borderRadius: "10px",
              },
            }}
            className={cn(a.animated, a.infinite, a.slower, a.pulse)}
          >
            <EnhImage
              src={image.url}
              alt={(image.alt || "Компьютерный мастер в Балашихе") + " МФЦ"}
              width={image.width}
              height={image.height}
              fitWidth={600}
              fitHeight={600}
              className={cn(a.animated, a.infinite, a.slower, a.pulse)}
              quality={100}
              fitParent
            />
          </Grid>
          <RequestComputerMaster />
        </Grid>
      </Container>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: "hidden",
          "& > img": {
            position: "absolute",
            zIndex: 0,
            height: "auto",
            maxHeight: "100%",
            right: { xs: "auto", md: 0, xl: 0 },
            left: { xs: 0, md: "auto" },
            top: 0,
            padding: "0 0 45px 0",
          },
        }}
      >
        <EnhImage
          width={1498}
          height={784}
          fitHeight={500}
          src="/images/my-computer-repair-bg.webp"
          alt="Компьютерный мастер Балашиха МФЦ остановка Горсовет"
          quality={90}
        />
      </Box>
    </StyledBox>
  );
};
export default SpecialHeader;
