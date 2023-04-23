import React, {
  useEffect,
  useContext,
  useState,
  createContext,
  FC,
  useReducer,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import { SuccessSnackbar } from "@components/ui";

export interface StateModifiers {
  openSidebar: () => void;
  closeSidebar: () => void;
  openDialog: (dialogType: DialogType) => void;
  closeDialog: () => void;
  openSnackbar: (snackbars: Partial<Snackbars>) => void;
  closeSnackbar: (snackbar: keyof Snackbars) => void;
}
export type DialogType = "NEW_PRODUCT_CATEGORY";
export const dialogTypes: { [key: string]: DialogType } = {
  NEW_PRODUCT_CATEGORY: "NEW_PRODUCT_CATEGORY",
};
export interface Snackbars {
  PRODUCT_CATEGORY_CREATED: {
    createdCategory: any;
  };
}
export interface StateValues {
  isSidebarOpen: boolean;
  isDialogOpen: boolean;
  dialogType: null | DialogType;
  snackbars: Partial<Snackbars>;
}
const stateModifiers = {
  openSidebar: () => {},
  closeSidebar: () => {},
  openDialog: (dialogType: DialogType) => {},
  closeDialog: () => {},
  openSnackbar: (snackbars: Partial<Snackbars>) => {},
  closeSnackbar: (snackbar: keyof Snackbars) => {},
};
const initialState = {
  isSidebarOpen: false,
  isDialogOpen: false,
  dialogType: null,
  snackbars: {},
};
type State = StateValues & StateModifiers;

const UIContext = createContext<State>({
  ...initialState,
  ...stateModifiers,
});
type Action = {
  type:
    | "RESET"
    | "OPEN_SIDEBAR"
    | "CLOSE_SIDEBAR"
    | "OPEN_DIALOG"
    | "CLOSE_DIALOG"
    | "OPEN_SNACKBAR"
    | "CLOSE_SNACKBAR";
  dialogType?: StateValues["dialogType"];
  snackbars?: Partial<Snackbars>;
  snackbarType?: keyof Snackbars;
};
function uiReducer(state: StateValues, action: Action): StateValues {
  switch (action.type) {
    case "RESET": {
      return { ...initialState };
    }
    case "OPEN_SIDEBAR": {
      return { ...state, isSidebarOpen: true };
    }
    case "CLOSE_SIDEBAR": {
      return { ...state, isSidebarOpen: false };
    }
    case "OPEN_DIALOG": {
      if (action.dialogType) {
        return {
          ...state,
          isDialogOpen: true,
          dialogType: action.dialogType || null,
        };
      }
    }
    case "CLOSE_DIALOG": {
      return { ...state, isDialogOpen: false, dialogType: null };
    }
    case "OPEN_SNACKBAR": {
      if (action.snackbars && Object.keys(action.snackbars).length) {
        return {
          ...state,
          snackbars: { ...state.snackbars, ...action.snackbars },
        };
      }
    }
    case "CLOSE_SNACKBAR": {
      const entries = Object.entries(state.snackbars).filter(
        ([key, val]) => key !== action.snackbarType
      );
      return { ...state, snackbars: { ...Object.fromEntries(entries) } };
    }
  }
  return { ...state };
}
const UIProvider = (props: any) => {
  const [state, dispatch] = useReducer(uiReducer, { ...initialState });
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      dispatch({ type: "RESET" });
    };
    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);
  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const openDialog = (dialogType: DialogType) =>
    dispatch({ type: "OPEN_DIALOG", dialogType });
  const closeDialog = () => dispatch({ type: "CLOSE_DIALOG" });
  const openSnackbar = (snackbars: Partial<Snackbars>) =>
    dispatch({ type: "OPEN_SNACKBAR", snackbars });
  const closeSnackbar = (snackbarType: keyof Snackbars) =>
    dispatch({ type: "CLOSE_SNACKBAR", snackbarType });
  const value = useMemo(() => {
    return {
      ...state,
      openSidebar,
      closeSidebar,
      openDialog,
      closeDialog,
      openSnackbar,
      closeSnackbar,
    };
  }, [state]);
  return (
    <>
      <UIContext.Provider value={value}>{props.children}</UIContext.Provider>
      {Object.entries(value.snackbars).map(
        ([snackbarType, snapbarArguments]) => {
          switch (snackbarType as keyof Snackbars) {
            case "PRODUCT_CATEGORY_CREATED":
              return (
                <SuccessSnackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={true}
                  onClose={() => closeSnackbar(snackbarType as keyof Snackbars)}
                  message={
                    <>{`Была создана категория "${snapbarArguments.createdCategory.breadcrumbs.join(
                      " / "
                    )}"`}</>
                  }
                  key={snackbarType}
                />
              );
              break;
            default:
              return null;
          }
        }
      )}
    </>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};
export const useUIProvider = () => {
  return { UIProvider };
};
export default UIProvider;
