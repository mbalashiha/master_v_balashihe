import React from "react";

interface Props {
  children: string;
}

export default function CutProtocol({ children: inChildren }: Props) {
  const children = React.useMemo(() => {
    return inChildren.replace(/^[^\/]*\/\//im, "");
  }, [inChildren]);
  return <>{children}</>;
}
