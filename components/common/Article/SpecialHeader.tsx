import { CMS } from "@common/types";
import { EnhImage } from "@components/ui";
import { Container, styled } from "@mui/material";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { HeaderTextParser } from "@components/common/HeaderTextParser";
import React, { useMemo } from "react";
import { blueGrey } from "@mui/material/colors";
import cn from "classnames";
import a from "@components/scss/animation.module.scss";
import GradientSVG from "public/gradient.svg";

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
    <StyledBox>
      <Container maxWidth={"lg"}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minWidth: "400px",
              display: "block",
              padding: "60px 0",
            }}
          >
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontSize: { xs: "28px", sm: "44px" },
                lineHeight: { xs: "39px", sm: "62px" },
                fontWeight: 700,
                px: { xs: "9px", sm: 0 },
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
            {keyTextHtml && (
              <Box
                sx={{
                  marginTop: "20px",
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
              </Box>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "60px",
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
        </Grid>
      </Container>
    </StyledBox>
  );
};
export default SpecialHeader;
