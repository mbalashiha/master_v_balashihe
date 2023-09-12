import { ProvidedDialog } from "@components/ui";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  ContactRequest,
  ContactsList,
} from "@components/site/contacts/ContactRequest";

interface ModalProviderValue {
  toggleModal: React.Dispatch<React.SetStateAction<MODAL_OPEN>>;
  closeModal: () => void;
}
const ModalProviderContext = createContext<Partial<ModalProviderValue>>({
  toggleModal: () => {},
  closeModal: () => {},
});
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
type MODAL_OPEN = null | "contact request form" | "contact list";

export const SiteModalProvider = ({ children }: Props) => {
  const [openedModal, toggleModal] = useState<MODAL_OPEN>(null);
  const closeModal = useCallback(() => toggleModal(null), []);
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
        break;
      case "contact list":
        return (
          <ProvidedDialog
            close={closeModal}
            maxWidth="sm"
            dialogActions={false}
          >
            <ContactsList />
          </ProvidedDialog>
        );
        break;
      default:
        return null;
    }
  }, [openedModal, closeModal]);
  return (
    <ModalProviderContext.Provider value={providing}>
      {children}
      {renderModal()}
    </ModalProviderContext.Provider>
  );
};

export const useSiteModal = () => {
  return useContext(ModalProviderContext) as ModalProviderValue;
};
