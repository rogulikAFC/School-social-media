import "./FormError.css";

type FormErrorProps = {
  children: string;
  blockName: string;
};

/**
 * Returns a component that shows which error was caused in form field.
 * @param {string} children - error string. It's passing through the body of the component.
 */
export const FormError = ({ blockName, children }: FormErrorProps) => (
  <span className={`form-error ${blockName}__form-error`}>{children}</span>
);
