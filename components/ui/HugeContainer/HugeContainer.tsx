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
  children = (
    <>
      {searchComponent}
      {originalChildren}
    </>
  );
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
        maxWidth: leftSidebar && rightSidebar && "1900px" || undefined,
        mt: 5,
        ...sx,
      }}
    >
      <Grid container spacing={spacing || { xs: 1, lg: 3, xl: 4 }}>
        {leftSidebar ? (
          <Grid
            item
            xs={12}
            md={12}
            lg={3}
            xl={rightSidebar ? 2.5 : 3}
            order={{ xs: 2, lg: 1 }}
          >
            <Box sx={{ pl: { xs: "5px", xl: 0 } }}>{leftSidebar}</Box>
          </Grid>
        ) : rightSidebar ? (
          <Grid item xs={0} lg={0} xl={2.5} order={{ xs: 2, lg: 1 }}></Grid>
        ) : null}
        <Grid
          item
          xs={12}
          md={12}
          lg={leftSidebar ? 9 : 12}
          xl={rightSidebar ? 7 : leftSidebar ? 9 : 12}
          order={{ xs: 1, lg: 2 }}
        >
          {children}
        </Grid>
        {rightSidebar && (
          <Grid item xs={12} lg={12} xl={2.5} order={{ xs: 3, lg: 3 }}>
            {rightSidebar}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
