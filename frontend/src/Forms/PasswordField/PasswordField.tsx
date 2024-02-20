import useFieldValidation from "../../hooks/useFieldValidation";
import { FormErrors } from "../FormErrors/FormErrors";
import { TextFieldProps } from "../TextField/TextField";
import validatePassword from "./validatePassword/validatePassword";

type PasswordFieldProps = Omit<TextFieldProps, "password" | "name"> & {
  name?: string;
};

/**
 * Makes validation of password each time its field updates.
 * @param {any} register - register from react-form-hook.
 * @param {string | null} errorFromHook - errors that consumed from react-form-hook errors for this component as array of strings.
 */
const PasswordField = ({
  blockName,
  register,
  errorFromHook,
  name = "Пароль",
}: PasswordFieldProps) => {
  const { handleInput, errors } = useFieldValidation(
    validatePassword,
    errorFromHook
  );

  return (
    <div className={`${blockName}__text-field-wrapper`}>
      <input
        className={`${blockName}__text-field text-field`}
        placeholder={name}
        type="password"
        onInput={handleInput}
        {...register}
      />

      {errors.length > 0 && (
        <FormErrors blockName={blockName} errors={errors} />
      )}
    </div>
  );
};

export default PasswordField;
