import "./FormErrors.css";
import { FormError } from "../FormError/FormError";

type FormErrorsProps = {
  blockName: string;
  errors: string[];
};

export const FormErrors = ({ errors, blockName }: FormErrorsProps) => (
  <div className={`form-errors ${blockName}__form-errors`}>
    {errors.map((e) => (
      <FormError blockName="form-errors" key={e}>
        {e}
      </FormError>
    ))}
  </div>
);
