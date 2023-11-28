import { Search } from "@components/site";
import {
  Grid,
  Box,
  Container,
  styled,
  Paper,
  PaletteMode,
} from "@mui/material";

type ContainerProps = React.ComponentProps<typeof Container>;
type BoxProps = React.ComponentProps<typeof Box>;
type GridContainerProps = React.ComponentProps<typeof Grid>;
type GridSX = React.ComponentProps<typeof Grid>["sx"];

interface Props extends BoxProps {
  children: React.ReactNode | React.ReactNode[];
  header?: React.ReactNode;
  leftSidebar?: React.ReactNode | React.ReactNode[];
  rightSidebar?: React.ReactNode | React.ReactNode[];
  sx?: BoxProps["sx"];
  colorMode?: PaletteMode;
}
export default function HugeContainer({
  children,
  header,
  leftSidebar,
  rightSidebar,
  sx,
  colorMode,
  ...rest
}: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        background: (theme) =>
          colorMode && colorMode === "dark"
            ? "#010101"
            : theme.palette.background.paper,
        pt: 1,
        pb: 0,
        ...sx,
      }}
      {...rest}
    >
      <Container maxWidth={"lg"} sx={{ px: { xs: "12px", md: undefined } }}>
        {header && <>{header}</>}
        <Grid container sx={{}}>
          {leftSidebar && (
            <Grid item xs={12} md={4} lg={4} order={{ xs: 2, lg: 1 }}>
              {leftSidebar}
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={leftSidebar ? 8 : 12}
            lg={leftSidebar ? 8 : 12}
            order={{ xs: 1, lg: 2 }}
          >
            {children}
          </Grid>
          {rightSidebar && (
            <Grid item xs={12} order={3}>
              {rightSidebar}
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
