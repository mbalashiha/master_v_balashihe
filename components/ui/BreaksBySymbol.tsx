import React from "react";

interface Props {
  character?: string;
  children: React.ReactNode | React.ReactNode[];
}
export function BreaksBySymbol(props: Props) {
  const character = props.character || ",";
  const { children } = props;
  return (
    <>
      {React.Children.map(children, (str) => {
        if (typeof str === "string") {
          return (
            <>
              {str.split(character).map((el, ind, array) => (
                <>
                  {el.trim()}
                  {ind < array.length - 1 && (
                    <>
                      {character} <br />
                    </>
                  )}
                </>
              ))}
            </>
          );
        } else {
          return <BreaksBySymbol character={character}>{str}</BreaksBySymbol>;
        };
      })}
    </>
  );
}
