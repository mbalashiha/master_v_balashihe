import { styled } from "@mui/material";

const StyledGrid = styled("div")<{ gridColumnsPercentage: string }>(
  ({ theme, gridColumnsPercentage }) => ({
    borderRadius: theme.shape.borderRadius * 0.65,
    overflow: "hidden",
    display: "inline-grid",
    gap: "3px",
    gridTemplateColumns: gridColumnsPercentage,
    "& > div": {
      padding: "12px",
      "& p, & span": {
        fontSize: "9pt",
        lineHeight: "13pt",
      },
    },
  })
);
export default StyledGrid;
