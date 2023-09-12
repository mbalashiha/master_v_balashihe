import { Management } from "@common/types/cms";
import { FabButtonProvider } from "@components/management/Layout";
import { ProvidedDialog } from "@components/ui";
import { ApiProvider } from "@framework";
import { ID } from "@framework/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { KeyedMutator } from "swr";
import ContactDialog from "./ContactDialog";
import { ContactRequest } from "./ContactRequest";
export interface ModalProviderValue {
  toggleModal: React.Dispatch<React.SetStateAction<MODAL_OPEN>>;
  closeModal: () => void;
}
export const ModalProviderContext = createContext<Partial<ModalProviderValue>>(
  {}
);
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
type MODAL_OPEN = undefined | "contact request form" | "contact list";

export const SiteModalProvider = ({ children }: Props) => {
  const [openedModal, toggleModal] = useState<MODAL_OPEN>(undefined);
  const closeModal = useCallback(() => toggleModal(undefined), []);
  const providing = useMemo(() => ({ toggleModal, closeModal }), [closeModal]);
  const renderModal = useCallback(() => {
    switch (openedModal) {
      case "contact request form":
        return (
          <ProvidedDialog
            close={closeModal}
            maxWidth="sm"
            dialogActions={false}
          >
            <ContactRequest />
          </ProvidedDialog>
        );

      case "contact list":
        return (
          <ProvidedDialog
            close={closeModal}
            maxWidth="sm"
            dialogActions={false}
          >
            <ContactRequest />
          </ProvidedDialog>
        );
      default:
        return null;
    }
  }, [openedModal, closeModal]);
  return (
    <ModalProviderContext.Provider value={providing}>
      {children}
      <ApiProvider>{renderModal()}</ApiProvider>
    </ModalProviderContext.Provider>
  );
};

export const useSiteModal = () => {
  return useContext(ModalProviderContext) as ModalProviderValue;
};
