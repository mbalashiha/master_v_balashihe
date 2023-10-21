import { Search } from "@components/site";
import { Grid, Box, Container, styled, Paper } from "@mui/material";

type ContainerProps = React.ComponentProps<typeof Container>;
type BoxProps = React.ComponentProps<typeof Box>;
type GridContainerProps = React.ComponentProps<typeof Grid>;
type GridSX = React.ComponentProps<typeof Grid>["sx"];

interface Props {
  children: React.ReactNode | React.ReactNode[];
  leftSidebar?: React.ReactNode | React.ReactNode[];
  rightSidebar?: React.ReactNode | React.ReactNode[];
  sx?: BoxProps["sx"];
  spacing?: GridContainerProps["spacing"];
}
export default function HugeContainer({
  children,
  leftSidebar,
  rightSidebar,
  sx,
  spacing,
}: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        background: (theme) => theme.palette.background.paper,
        pt: 1.5,
        pb: 0,
        ...sx,
      }}
    >
      <Container maxWidth={"lg"}>
        <Grid container spacing={spacing || { xs: 1, lg: 3, xl: 4 }}>
          {leftSidebar && (
            <Grid item xs={12} md={12} lg={4} order={{ xs: 2, lg: 1 }}>
              <Box sx={{ pl: { xs: "5px", xl: 0 } }}>{leftSidebar}</Box>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={12}
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
