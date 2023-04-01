import { Search } from "@components/site";
import { Grid, Box, Container, styled, Paper } from "@mui/material";

type ContainerProps = React.ComponentProps<typeof Container>;
type GridContainerProps = React.ComponentProps<typeof Grid>;
type GridSX = React.ComponentProps<typeof Grid>["sx"];

interface Props {
  children: React.ReactNode | React.ReactNode[];
  leftSidebar?: React.ReactNode | React.ReactNode[];
  rightSidebar?: React.ReactNode | React.ReactNode[];
  sx?: ContainerProps["sx"];
  spacing?: GridContainerProps["spacing"];
  showSearch?: boolean;
}
export default function HugeContainer({
  children,
  leftSidebar,
  rightSidebar,
  sx,
  spacing,
  showSearch,
}: Props) {
  const originalChildren: typeof children = children;
  const searchComponent = showSearch && <Search sx={{ mb: 2.2 }} />;
  let centralGridSX: GridSX = {};
  children = rightSidebar ? (
    <Box
      sx={{
        maxWidth: { xl: "1094px" },
      }}
    >
      {searchComponent}
      {originalChildren}
    </Box>
  ) : (
    <>
      {searchComponent}
      {originalChildren}
    </>
  );
  if (rightSidebar) {
    centralGridSX = {
      ...centralGridSX,
      display: { xl: "flex" },
      flexDirection: { xl: "row" },
      justifyContent: {
        xl:
          (!leftSidebar && !rightSidebar) || (leftSidebar && rightSidebar)
            ? "center"
            : leftSidebar
            ? "flex-start"
            : "flex-end",
      },
    };
  }
  return (
    <Container
      maxWidth={
        (leftSidebar && rightSidebar) || rightSidebar
          ? false
          : leftSidebar
          ? "xl"
          : "md"
      }
      sx={{
        maxWidth: {
          xl:
            leftSidebar && rightSidebar
              ? "2000px"
              : rightSidebar
              ? "1800px"
              : undefined,
        },
        mt: 5,
        ...sx,
      }}
    >
      <Grid container spacing={spacing || { xs: 1, xl: 3 }}>
        {leftSidebar && (
          <Grid item xs={12} md={12} lg={3} order={{ xs: 2, lg: 1 }}>
            {leftSidebar}
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={12}
          lg={
            rightSidebar && leftSidebar
              ? 6
              : rightSidebar || leftSidebar
              ? 9
              : 12
          }
          sx={centralGridSX}
          order={{ xs: 1, lg: 2 }}
        >
          {children}
        </Grid>
        {rightSidebar && (
          <Grid item xs={12} md={12} lg={3} order={{ xs: 3, lg: 3 }}>
            {rightSidebar}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
