import { FormErrors } from "../FormErrors/FormErrors";
import "./TextField.css";

export type TextFieldProps = {
  blockName: string;
  name: string;
  register: any;
  password?: boolean;
  errorFromHook: string | undefined;
};

const TextField = ({
  name,
  blockName,
  register,
  password,
  errorFromHook,
}: TextFieldProps) => (
  <div className={`${blockName}__text-field-wrapper`}>
    <input
      className={`${blockName}__text-field text-field`}
      placeholder={name}
      type={password ? "password" : "text"}
      {...register}
    />

    {errorFromHook && (
      <FormErrors errors={[errorFromHook]} blockName={blockName} />
    )}
  </div>
);

export default TextField;
