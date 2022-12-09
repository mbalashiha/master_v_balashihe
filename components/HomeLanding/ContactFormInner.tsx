import "react-phone-input-2/lib/style.css";
// import ru from "react-phone-input-2/lang/ru.json";
import { Button, TextField } from "@mui/material";
import { StyledPhoneInput, StyledTextField } from "./ui";
import cn from "classnames";

export const ContactForm = () => (
  <>
    <form className="space-y-4" method="POST" action="/">
      <div>
        <StyledTextField
          variant="filled"
          id="contact-name-input"
          label="Имя*"
        />
      </div>
      <div>
        <StyledTextField
          variant="filled"
          id="contact-email-input"
          placeholder=""
          label="E-mail*"
        />
      </div>
      <StyledPhoneInput
        labelText="Ваш телефон*"
        country={"ru"}
        // localization={ru}
        preferredCountries={["ru", "kz", "by", "lv", "uz", "ua"]}
        priority={{ ru: 0, kz: 1, by: 2, lv: 3, uz: 4, ua: 5 }}
        placeholder="Ваш телефон*"
        inputProps={{
        }}
      />
      <div>
        <StyledTextField
          variant="filled"
          id="contact-message-input"
          placeholder=""
          label="Сообщение"
        />
      </div>
        <Button
          type="submit"
        >
          Оставить заявку
        </Button>
    </form>
  </>
);
