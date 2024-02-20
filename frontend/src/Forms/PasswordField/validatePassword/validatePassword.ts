import passwordExceptions from "./passwordExceptions";

/**
 * Validate if password not contains not latin letters, has more than 7 symbols, has at least one capital letter and one digit
 */
const validatePassword = (password: string): string[] => {
  let errors: string[] = [];

  if (password.length === 0) return [];

  if (password.length < 7) errors.push(passwordExceptions.TooShort);

  const containsNotLatinLetters = /[^A-Za-z1-9]/;

  if (containsNotLatinLetters.test(password))
    errors.push(passwordExceptions.ContainsNotLatinLetters);

  const withCapitalLetters = /[A-Z]+/;

  if (!withCapitalLetters.test(password))
    errors.push(passwordExceptions.NotContainsCapitalLetters);

  const withDigits = /\d+/;

  if (!withDigits.test(password))
    errors.push(passwordExceptions.NotContainsDigits);

  return errors;
};

export default validatePassword;
