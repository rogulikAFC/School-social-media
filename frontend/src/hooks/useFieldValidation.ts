import { useEffect, useState } from "react";

type useFieldValidationResult = {
  /**
   * Checks input value for errors each time it updates.
   * @param e - event.
   * @returns void.
   */
  handleInput: (e: any) => void;
  errors: string[];
};

/**
 * Hook which is used for validate fields.
 * @param validate - function that validates value.
 * @param errorFromHook - error from react-hook-form.
 * @returns {useFieldValidationResult} function for validate input value and errors list.
 */
const useFieldValidation = (
  validate: (value: string) => string[],
  errorFromHook: string | undefined
) => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (errorFromHook) setErrors([errorFromHook, ...errors]);
  }, [errorFromHook]);

  const handleInput = (e: any) => {
    if (errorFromHook)
      setErrors([...new Set([errorFromHook, ...validate(e.target.value)])]);
    else setErrors([...new Set([...validate(e.target.value)])]);
  };

  return {
    handleInput,
    errors,
  } as useFieldValidationResult;
};

export default useFieldValidation;
