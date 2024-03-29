import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import {
  styled,
  Modal as MuiModal,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
const Modal = MuiModal as any;
import { FormProvider } from "@components/ui/FormProvider";
import { simpleEncrypt } from "@framework/management/utils/encryption/message-hmac-private-key";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const OneClickSellModal = ({ open, handleClose }: Props) => {
  const onClose = handleClose;
  return (
    <>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-order-in-click"
          aria-describedby="modal-fast-request-for-master"
          disableEnforceFocus
        >
        </Modal>
        <FormProvider
          validate={(values: any) => {
            return true;
          }}
          onSubmit={async (values: any, { resetForm }) => {
            const whatSending = { ...values };
            const hmess = simpleEncrypt(whatSending);
            const res = await fetch(
              "/api/request-contact-form-by-post-method",
              {
                method: "POST",
                // headers: {
                //   "Content-Type": "application/x-www-form-urlencoded",
                // },
                body: hmess,
              } as any
            );
            let errorText: string = "";
            try {
              if (res.ok) {
                const jsonObj = await res.json();
                if (jsonObj.response && /^250\s+/im.test(jsonObj.response)) {
                } else {
                  throw { message: jsonObj.response, status: res.status };
                }
              } else {
                let errorJsonData;
                try {
                  errorJsonData = await res.json();
                  if (
                    typeof errorJsonData.error === "string" &&
                    errorJsonData.error
                  ) {
                    errorJsonData = {
                      ...errorJsonData,
                      message: errorJsonData.error,
                    };
                  } else if (
                    typeof errorJsonData.error === "object" &&
                    errorJsonData.error
                  ) {
                    errorJsonData = {
                      ...errorJsonData,
                      ...errorJsonData.error,
                    };
                  }
                } catch (e: any) {
                  throw {
                    message: (e && (e.stack || e.message)) || e,
                    status: res.status,
                    stack: (e && e.stack) || null,
                  };
                }
                throw { ...errorJsonData, status: res.status };
              }
            } catch (e: any) {
              errorText =
                e && e.message
                  ? e.message
                  : (e.status ? `${e.status}: ` : ``) +
                    (e.stack || e.message || e || "");
            }
          }}
          initialValues={{ name: "", email: "", phoneNumber: "", comment: "" }}
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-order-in-click"
            aria-describedby="modal-fast-request-for-master"
            disableEnforceFocus
          >
          </Modal>
        </FormProvider>
    </>
  );
};

export default OneClickSellModal;
