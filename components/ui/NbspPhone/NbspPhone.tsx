import { Box } from "@mui/material";
import { useMemo } from "react";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & { prefix?: string; children: string };

export default function NbspPhone({ prefix, children, ...rest }: Props) {
  return (
    <Box component="span" sx={{ whiteSpace: "nowrap" }}>
      {prefix ? <>{prefix} </> : undefined}
      <span {...rest}>{children}</span>
    </Box>
  );
}
