import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./LandingContactForm.module.scss";
import LandingInfo from "./LandingInfo";
import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";
import Base64 from "crypto-js/enc-base64";
import * as yup from "yup";
import useFormValidation from "@/src/hooks/form-validation-hook";
import {
  simpleEncrypt,
} from "@encryption/message-hmac-private-key";
import { parse_navigator_userAgent } from "@/src/statistics/user-agent-main-fields";
import { ContactForm } from "./ContactFormInner";
import { ErrorModal } from "./ErrorModal";
import PrivacyLink from "./PrivacyLink";
import { Container } from "@mui/material";

interface IFormInputs {
  name: string;
  email: string;
  phone_number: string;
  only_numbers_phone_number: string;
  message?: string;
  telephone_input_has_focus: boolean;
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    only_numbers_phone_number: yup
      .string()
      .matches(/^[\+]?\d{11,}$/gim)
      .required(),
  })
  .required();
const LandingContactForm = (props) => {
  const [formStatus, setMessageWasSended] = useState({
    formSendingSuccess: false,
    formSendingError: false,
    formErrorTimestamp: 0,
    formIsBeingSend: false,
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [ErrorText, setErrorText] = React.useState("");
  const showModal = (ErrorText: string) => {
    if (ErrorText) {
      setErrorText(ErrorText);
      setIsOpen(true);
    }
  };
  const hideModal = () => {
    setErrorText("");
    setIsOpen(false);
  };
  // const formStatusRef = useRef(formStatus);
  // const formSendingErrorRef = useRef(formStatus.formSendingError);
  // const fsetMessageWasSendedRef = useRef(setMessageWasSended);
  const { formState, clearForm, errors, field, isFormValid, setFields } =
    useFormValidation<IFormInputs>(schema);
  /*useEffect(() => {
    if (!formStatus.formSendingSuccess && formStatus.formIsBeingSend) {
      const curDate = Date.now();
      const dif = curDate - formStatus.formErrorTimestamp;
      console.log(dif, curDate, formStatus.formErrorTimestamp);
      const timeToWait = 4000 - dif;
      
      if (timeToWait > 5) {
        
        const t_id = setTimeout(() => {
          fsetMessageWasSendedRef.current({
            ...formStatusRef.current,
            formIsBeingSend: false,
            formSendingError: formSendingErrorRef.current,
          });
        }, timeToWait);
        return () => clearTimeout(t_id);
      } else {
        fsetMessageWasSendedRef.current({
          ...formStatusRef.current,
          formSendingError: formSendingErrorRef.current,
          formIsBeingSend: false,
        });
      }
    }
  }, [formStatus.formErrorTimestamp]);*/
  const formSubmit = async (event) => {
    event.preventDefault();
    /*retu*rn  setMessageWasSended({
        ...formStatus,
        formIsBeingSend: !formStatus.formIsBeingSend,
      });*/
    if (formStatus.formIsBeingSend) {
      return;
    }
    if (await isFormValid()) {
      setMessageWasSended({
        ...formStatus,
        formIsBeingSend: true,
      });
      const stats_obj = await parse_navigator_userAgent(
        window,
        navigator,
        screen
      );
      const whatSending = { ...formState, stats_obj };
      const hmess = simpleEncrypt(whatSending);
      const res = await fetch("/api/request-contact-form-by-post-method", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        body: hmess,
      } as any);
      let errorText: string = "";
      try {
        if (res.ok) {
          const jsonObj = await res.json();
          if (jsonObj.response && /^250\s+/im.test(jsonObj.response)) {
            clearForm();
            hideModal();
            return setMessageWasSended({
              ...formStatus,
              formSendingSuccess: true,
              formSendingError: false,
              formIsBeingSend: false,
            });
          }
        }
      } catch (e: any) {
        errorText = e.stack || e.message;
      }
      if (!errorText) {
        try {
          const errorObj = await res.json();
          if (errorObj.error) {
            errorText =
              typeof errorObj.error === "string"
                ? errorObj.error
                : JSON.stringify(errorObj.error, null, 2);
          } else {
            errorText = JSON.stringify(errorObj, null, 2);
          }
        } catch (e: any) {
          try {
            errorText = await res.text();
          } catch (e: any) {
            errorText = e.stack || e.message;
          }
        }
      }
      showModal(errorText);
      return setMessageWasSended({
        ...formStatus,
        formSendingSuccess: false,
        formSendingError: true,
        formIsBeingSend: false,
        formErrorTimestamp: Date.now(),
      });
    }
  };
  return (
    <>
      <div className="flex p-[8px] md:p-[20px] items-center justify-center h-[100vh]">
        <div className="w-full m-auto grid gap-y-5 gap-x-4 md:gap-x-8 xl:gap-x-12 grid-cols-1 lg:grid-cols-5 2xl:grid-cols-3 lg:max-w-[1260px]">
          <div className="w-full lg:col-span-3 2xl:col-span-2 flex justify-end items-start">
            <div className={styles.infoWrapper}>
              <LandingInfo />
            </div>
          </div>
          <div className="w-full p-0 lg:pt-0 lg:col-span-2 xl:min-h-[540px] 2xl:col-span-1 flex justify-start items-start">
            <div className={styles.formwrapper}>
              <div className="form-text">
                <div className={styles.form_title}>
                  Хотите получить <br />
                  <strong style={{ fontSize: "18px" }}>БЕСПЛАТНУЮ</strong>{" "}
                  консультацию?
                </div>
              </div>
              {(formStatus.formSendingError && (
                <div
                  className="form-errorbox"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setMessageWasSended({
                      ...formStatus,
                      formSendingError: false,
                      formSendingSuccess: false,
                      formIsBeingSend: false,
                    })
                  }
                >
                  Ой! Произошла какая-то ошибка.
                  <br />
                  Приношу свои извенения.
                </div>
              )) ||
                (!formStatus.formSendingSuccess && (
                  <ContactForm
                    {...{
                      formState,
                      errors,
                      field,
                      isFormValid,
                      setFields,
                      styles,
                      formSubmit,
                      formIsBeingSend: formStatus.formIsBeingSend,
                    }}
                  />
                )) || (
                  <div className="form-successbox">
                    Спасибо! Данные успешно отправлены.
                  </div>
                )}
              <PrivacyLink className={styles.privacy_link} />
              <div className={styles.opacity_bg}></div>
            </div>
          </div>
        </div>
      </div>
      {ErrorText && isOpen && (
        <ErrorModal
          ErrorText={ErrorText}
          isOpen={isOpen}
          hideModal={hideModal}
        />
      )}
    </>
  );
};

export default LandingContactForm;
