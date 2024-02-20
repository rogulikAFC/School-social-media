import { ChangeEvent, useState } from "react";
import { FormError } from "./FormError/FormError";

/**
 * Makes validation of field each time its updates.
 *
 * @param children - children components that uses validation.
 * @param validate - function that validate value.
 * @param errorsFromHook - errors from react-form-hook for this component.
 * @param register - register from react-form-hook
 */
const withValidation = (
  children: JSX.Element,
  validate: (value: any) => string[],
  blockName: string,
  errorsFromHook: string[],
  register: any
) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {    
    setErrors([...new Set([...errorsFromHook, ...validate(e.target.value)])]); // Using Set to leave only unique values
    // console.log(errors)
    console.log("chnaged")
  };

  // children.props.onChange = handleFieldChange;
  // children.type

  const oldRegisterOnChange = register.onChange;

  console.log(oldRegisterOnChange)

  register.onChange = async (e: any) => {
    await oldRegisterOnChange(e)
    handleFieldChange(e)
  }

  console.log(register.onChange);

  return (
    <div
      className={`${blockName}__field-with-validation field-with-validation`}
    >
      {children}
      {errors.map((e) => (
        <FormError blockName="field-with-validation">{e}</FormError>
      ))}
    </div>
  );
};

export default withValidation;
