import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useFormValidation from "@/src/hooks/form-validation-hook";
import * as yup from "yup";
import { Alert, AlertTitle } from "@mui/material";

interface IFormInputs {
  page_name: string;
}

const schema = yup
  .object({
    page_name: yup
      .string()
      .matches(/^[\d\p{L}\- ]+$/imu)
      .required(),
  })
  .required();

const QuestionModal = ({ navigation }) => {
  const [open, setOpen] = React.useState(true);

  const [errorResponse, setErrorResponse] = React.useState(
    null as {
      message: string;
      stack: string;
    } | null
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { formState, clearForm, errors, field, isFormValid, setFields } =
    useFormValidation<IFormInputs>(schema);
  const formSubmit = async (event) => {
    event.preventDefault();
    /*retu*rn  setMessageWasSended({
        ...formStatus,
        formIsBeingSend: !formStatus.formIsBeingSend,
      });*/
    // if (formStatus.formIsBeingSend) {
    //   return;
    // }
    if (await isFormValid()) {
      const whatSending = { ...navigation, ...formState };
      // console.error(JSON.stringify(whatSending, null, 2));
      const res = await fetch("/api/save-page-navigation-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(whatSending),
      } as any);
      try {
        if (res.ok) {
        }
        const jsonObj = await res.json();
        if (jsonObj.error) {
          if (typeof jsonObj.error === "string") {
            setErrorResponse({ message: jsonObj.error, stack: "" });
          } else {
            setErrorResponse({
              message: jsonObj.error.message,
              stack: jsonObj.error.stack,
            });
          }
        } if (res.ok){
          setErrorResponse(null);
        }
      } catch (e: any) {
        setErrorResponse({ message: e.message, stack: e.stack });
      }
    }
  };
  const formDisabled = !navigation || !navigation.page_path;
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xl"}>
      <form onSubmit={formSubmit}>
        <DialogTitle>
          {`Страница "${(navigation && navigation.page_path) || typeof navigation}"`}
        </DialogTitle>
        {errorResponse && (
          <Alert severity="error">
            {errorResponse.message && (
              <AlertTitle>{errorResponse.message}</AlertTitle>
            )}
            {errorResponse.stack && <pre>{errorResponse.stack}</pre>}
          </Alert>
        )}
        <DialogContent>
          <DialogContentText>
            Введите недостающие данные для этой страницы:
          </DialogContentText>
          <TextField
            autoFocus
            disabled={formDisabled}
            margin="dense"
            id="page_name"
            label="Имя страницы"
            type="text"
            fullWidth
            error={!!errors.page_name?.message}
            variant={"filled"}
            {...field("page_name")}
          />
          {errors.page_name?.message ? (
            <div className="input_error">
              Введите имя страницы: только буквы, цифры, пробелы и тирэ.
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button disabled={formDisabled} onClick={handleClose}>
            Отменить
          </Button>
          <Button disabled={formDisabled} onClick={formSubmit}>
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default QuestionModal;
