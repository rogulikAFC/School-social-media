import { describe, expect, it } from "vitest";
import validatePassword from "./validatePassword";
import passwordExceptions from "./passwordExceptions";

describe("validatePassword", () => {
  it("should't catch password that has normal length", () => {
    expect(
      validatePassword("qwertyuiop").includes(passwordExceptions.TooShort)
    ).toBeFalsy();
  });

  it("should't catch password that has 7 letters", () => {
    expect(
      validatePassword("qwertyu").includes(passwordExceptions.TooShort)
    ).toBeFalsy();
  });

  it("should catch password that has less than 7 letters", () => {
    expect(
      validatePassword("qwe").includes(passwordExceptions.TooShort)
    ).toBeTruthy();
  });

  it("shouldn't catch password that consists of latin letters", () => {
    expect(
      validatePassword("QwerTy").includes(
        passwordExceptions.ContainsNotLatinLetters
      )
    ).toBeFalsy();
  });

  it("should catch password that contains not latin letters", () => {
    expect(
      validatePassword("qweжty").includes(
        passwordExceptions.ContainsNotLatinLetters
      )
    ).toBeTruthy();

    expect(
      validatePassword("qweäty").includes(
        passwordExceptions.ContainsNotLatinLetters
      )
    ).toBeTruthy();
  });

  it("shouldn't catch password that has capital letters", () => {
    expect(
      validatePassword("QwerTy").includes(
        passwordExceptions.NotContainsCapitalLetters
      )
    ).toBeFalsy();
  });

  it("should catch password that doesn't contains capital letters", () => {
    expect(
      validatePassword("qwerty").includes(
        passwordExceptions.NotContainsCapitalLetters
      )
    ).toBeTruthy();
  });

  it("shouldn't catch password that contains digits", () => {
    expect(
      validatePassword("qwer2ty").includes(passwordExceptions.NotContainsDigits)
    ).toBeFalsy();
  });

  it("should catch password that doesn't contain digits", () => {
    expect(
      validatePassword("qwerty").includes(passwordExceptions.NotContainsDigits)
    ).toBeTruthy();
  });

  it("shouldn't catch normal password", () => {
    expect(validatePassword("Qwerty123456").length === 0).toBeTruthy();
  });

  it("should catch password with multiple errors", () => {
    expect(validatePassword("qwert").length > 1).toBeTruthy();
  });
});
