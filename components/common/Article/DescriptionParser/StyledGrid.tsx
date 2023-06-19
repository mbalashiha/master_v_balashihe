import { styled } from "@mui/material";

const StyledGrid = styled("div")<{ gridColumnsPercentage: string }>(
  ({ theme, gridColumnsPercentage }) => ({
    borderRadius: theme.shape.borderRadius * 0.65,
    overflow: "hidden",
    display: "grid",
    gap: "3px",
    gridTemplateColumns: gridColumnsPercentage,
    "& > div": {
      padding: "12px",
      "& p": {
        fontSize: "17px",
        lineHeight: "25px",
        margin: 0,
        padding: 0,
      },
    },
  })
);
export default StyledGrid;
