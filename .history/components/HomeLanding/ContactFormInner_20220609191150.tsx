import "react-phone-input-2/lib/style.css";
import ru from "react-phone-input-2/lang/ru.json";
import { Button, TextField } from "@mui/material";
import { StyledPhoneInput, StyledTextField } from "./ui";
import cn from "classnames";

export const ContactForm = ({
  formState,
  errors,
  field,
  isFormValid,
  setFields,
  styles,
  formIsBeingSend,
  formSubmit,
}) => (
  <>
    <form className="space-y-4" method="POST" action="/" onSubmit={formSubmit}>
      <div>
        <StyledTextField
          variant="filled"
          disabled={formIsBeingSend}
          id="contact-name-input"
          label="Имя*"
          error={!!errors.name?.message}
          helperText={errors.name?.message ? "Обязательное поле" : ""}
          {...field("name").input}
        />
      </div>
      <div>
        <StyledTextField
          variant="filled"
          id="contact-email-input"
          disabled={formIsBeingSend}
          placeholder=""
          label="E-mail*"
          error={!!errors.email?.message}
          helperText={
            errors.email?.message ? "Введите корректный адрес e-mail" : ""
          }
          {...field("email").input}
        />
      </div>
      <StyledPhoneInput
        errorMessage={errors.only_numbers_phone_number?.message}
        labelText="Ваш телефон*"
        disabled={formIsBeingSend}
        country={"ru"}
        localization={ru}
        preferredCountries={["ru", "kz", "by", "lv", "uz", "ua"]}
        priority={{ ru: 0, kz: 1, by: 2, lv: 3, uz: 4, ua: 5 }}
        placeholder="Ваш телефон*"
        value={field("only_numbers_phone_number").input.value}
        inputProps={{
          disabled: formIsBeingSend,
        }}
        onFocus={() => setFields("telephone_input_has_focus", true)}
        onBlur={() => setFields("telephone_input_has_focus", false)}
        onChange={(value, country, e, formattedValue) => {
          setFields({
            only_numbers_phone_number: value,
            phone_number: formattedValue,
          });
        }}
      />
      <div>
        <StyledTextField
          variant="filled"
          id="contact-message-input"
          disabled={formIsBeingSend}
          placeholder=""
          label="Сообщение"
          error={!!errors.message?.message}
          helperText={errors.message?.message ? "Введите Ваше сообщение" : ""}
          {...field("message").input}
        />
      </div>
      {(formIsBeingSend && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: "100%" }}
          ></div>
        </div>
      )) || (
        <Button
          type="submit"
          disabled={formIsBeingSend}
          className={cn(styles.submit_button, "furore-font-family")}
        >
          Оставить заявку
        </Button>
      )}
    </form>
  </>
);
