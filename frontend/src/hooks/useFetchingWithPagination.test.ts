/**
 * @vitest-environment jsdom
 */

import { describe, test, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchingWithPagination from "./useFetchingWithPagination";
import { users } from "../mocks/data/users";

describe("useFetchWithPagination hook", () => {
  test("has normal pageSize", async () => {
    const { result } = renderHook(() =>
      useFetchingWithPagination<User>({
        pageSize: 2,
        relativeUrlWithoutParams: "api/Users",
      })
    );

    expect(result.current.isLoaded).toBeFalsy();

    await waitFor(() => {
      expect(result.current.entities).toEqual(users.slice(0, 2));
      expect(result.current.isLoaded).toBeTruthy();
    });
  });

  test("has negative pageSize", () => {
    expect(() =>
      renderHook(() =>
        useFetchingWithPagination<User>({
          pageSize: -2,
          relativeUrlWithoutParams: "api/Users",
        })
      )
    ).toThrowError("Page size cannot be negative");
  });

  test("has pageSize that is greater than limit", () => {
    expect(() =>
      renderHook(() =>
        useFetchingWithPagination<User>({
          pageSize: 16,
          relativeUrlWithoutParams: "api/Users",
        })
      )
    ).toThrowError("Page size cannot be greater than 15");
  });

  test("should catch an server error", async () => {
    const { result } = renderHook(() =>
      useFetchingWithPagination<User>({
        pageSize: 2,
        relativeUrlWithoutParams: "api/Users",
        searchParams: "errorCode=404",
      })
    );

    await waitFor(() =>
      expect(result.current.error).toEqual("Something went wrong")
    );
  });

  test("has normal relativeUrlWithoutParams", () => {
    expect(() =>
      renderHook(() =>
        useFetchingWithPagination<User>({
          pageSize: 2,
          relativeUrlWithoutParams: "api/Users",
        })
      )
    ).not.toThrowError();
  });

  test("has relativeUrlWithoutParams that is not relative", () => {
    expect(() => {
      renderHook(() =>
        useFetchingWithPagination<User>({
          pageSize: 2,
          relativeUrlWithoutParams: "https://www.testserver.com/api/Users",
        })
      );
    }).toThrowError("relativeUrlWithoutParams must be relative");
  });

  test("has relativeUrlWithoutParams that contains params", () => {
    expect(() => {
      renderHook(() =>
        useFetchingWithPagination<User>({
          pageSize: 2,
          relativeUrlWithoutParams: "api/Users?testparam=10&testparam2=15",
        })
      );
    }).toThrowError("relativeUrlWithoutParams must be without params");
  });

  test("has data that consists of the desired type", async () => {
    const { result } = renderHook(() =>
      useFetchingWithPagination<User>({
        pageSize: 2,
        relativeUrlWithoutParams: "api/Users",
      })
    );

    expect(result.current.isLoaded).toBeFalsy();

    await waitFor(() => {
      expect(result.current.entities).toEqual(users.slice(0, 2));
      expect(result.current.isLoaded).toBeTruthy();
    });
  });

  test.skip("has data that does not consist of the desired type", async () => {
    // expect(
    //   renderHook(() =>
    //     useFetchingWithPagination<School>({
    //       pageSize: 2,
    //       relativeUrlWithoutParams: "api/Users", // it returns User[], not School[]
    //     })
    //   )
    // ).toThrowError("Response does not consists of the desired type");

    const { result } = renderHook(() =>
      useFetchingWithPagination<School>({
        pageSize: 2,
        relativeUrlWithoutParams: "api/Users", // it returns User[], not School[]
      })
    );

    await waitFor(() =>
      expect(result.current.error).toEqual("Something went wrong")
    );
  });

  test("is not on last page", async () => {
    const { result } = renderHook(() =>
      useFetchingWithPagination<User>({
        pageSize: 3,
        relativeUrlWithoutParams: "api/Users",
      })
    );

    await waitFor(() => {
      expect(result.current.isLastPage).toBeFalsy();
      expect(result.current.entities).toEqual(users.slice(0, 3));
    });
  });

  test("is on last page", async () => {
    const { result } = renderHook(() =>
      useFetchingWithPagination<User>({
        pageSize: 10,
        relativeUrlWithoutParams: "api/Users",
      })
    );

    await waitFor(() => {
      expect(result.current.isLastPage).toBeTruthy();
      expect(result.current.isLoaded).toBeTruthy();
      expect(result.current.entities).toEqual(users);
    });
  });
});
