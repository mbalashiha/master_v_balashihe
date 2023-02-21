import { API } from "@common/types";
import React from "react";
import { createContext, useContext, useMemo } from "react";
interface Context {
  buttons: {
    create?: SetArgs;
  };
  setCreateButton: ({ href }: SetArgs) => void;
  unsetCreateButton: () => void;
}
export const FabButtonContext = createContext<Partial<Context>>({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
interface SetArgs {
  href: string;
}
export const FabButtonProvider = ({ children }: Props) => {
  const [buttons, setButtons] = React.useState<Context["buttons"]>({});
  const buttonsRef = React.useRef(buttons);
  buttonsRef.current = buttons;
  const setCreateButton = React.useCallback(({ href }: SetArgs) => {
    const buttons = buttonsRef.current;
    if (href) {
      setButtons({ ...buttons, create: { href } });
    }
  }, []);
  const unsetCreateButton = React.useCallback(() => {
    const buttons = buttonsRef.current;
    delete buttons.create;
    setButtons({ ...buttons });
  }, []);
  const value = {
    buttons,
    setCreateButton,
    unsetCreateButton,
  };
  return (
    <FabButtonContext.Provider value={value}>
      {children}
    </FabButtonContext.Provider>
  );
};

export const useFabButton = () => {
  return useContext(FabButtonContext) as Context;
};
