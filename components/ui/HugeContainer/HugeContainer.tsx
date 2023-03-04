import { Grid, Box, Container, styled, Paper } from "@mui/material";

type ContainerProps = React.ComponentProps<typeof Container>;
type GridContainerProps = React.ComponentProps<typeof Grid>;

interface Props {
  children: React.ReactNode | React.ReactNode[];
  leftSidebar?: React.ReactNode | React.ReactNode[];
  rightSidebar?: React.ReactNode | React.ReactNode[];
  sx?: ContainerProps["sx"];
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
    <Container maxWidth="xl" sx={{ ...sx }}>
      <Grid container spacing={spacing || { xs: 1, xl: 3 }}>
        {leftSidebar && (
          <Grid item xs={12} md={12} lg={3}>
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
        >
          {children}
        </Grid>
        {rightSidebar && (
          <Grid item xs={12} md={12} lg={3}>
            {rightSidebar}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
