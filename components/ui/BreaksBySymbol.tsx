import React from "react";
function isReactFragment(variableToInspect: any): boolean {
  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment;
  }
  return variableToInspect === React.Fragment;
}
interface Props {
  character?: string;
  children: React.ReactNode | React.ReactNode[];
}
export function BreaksBySymbol(props: Props) {
  const character = props.character || ",";
  const { children } = props;
  let counter = 0;
  return (
    <>
      {React.Children.map(children, (str) => {
        counter++;
        if (typeof str === "string") {
          return (
            <React.Fragment key={counter}>
              {str.split(character).map((el, ind, array) => (
                <React.Fragment key={ind.toString()}>
                  {el.trim()}
                  {ind < array.length - 1 && (
                    <>
                      {character} <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        } else if (React.isValidElement(str) || isReactFragment(str)) {
          return (
            <BreaksBySymbol key={counter} character={character}>
              {str}
            </BreaksBySymbol>
          );
        } else {
          return str;
        }
      })}
    </>
  );
}
