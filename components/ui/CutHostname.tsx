import React from "react";

interface Props {
  children: string;
}

export default function CutHostname({ children: inChildren }: Props) {
  const children = React.useMemo(() => {
    return inChildren
      .replace(/^[^\/]*\/\/[^\/]*\//im, "")
      .replace(/^[^\/]*\/\//im, "");
  }, [inChildren]);
  return <>{children}</>;
}
