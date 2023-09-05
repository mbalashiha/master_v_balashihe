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
  useState,
} from "react";
import { KeyedMutator } from "swr";
import ContactDialog from "./ContactDialog";
import { ContactRequest } from "./ContactRequest";
export interface ModalProviderValue {
  closeContactRequest: () => void;
  openContactRequest: () => void;
}
export const ModalProviderContext = createContext<Partial<ModalProviderValue>>(
  {}
);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const SiteModalProvider = ({ children }: Props) => {
  const [contactRequestOpened, setContactRequestOpened] =
    useState<boolean>(false);
  const openContactRequest = useCallback(
    () => setContactRequestOpened(true),
    []
  );
  const closeContactRequest = useCallback(
    () => setContactRequestOpened(false),
    []
  );
  const providing = useMemo(
    () => ({
      openContactRequest,
      closeContactRequest,
    }),
    [openContactRequest, closeContactRequest]
  );
  return (
    <ModalProviderContext.Provider value={providing}>
      {children}
      <ApiProvider>
        {contactRequestOpened && (
          <ProvidedDialog
            open={contactRequestOpened}
            close={closeContactRequest}
          >
            <ContactRequest />
          </ProvidedDialog>
        )}
      </ApiProvider>
    </ModalProviderContext.Provider>
  );
};

export const useSiteModal = () => {
  return useContext(ModalProviderContext) as ModalProviderValue;
};
