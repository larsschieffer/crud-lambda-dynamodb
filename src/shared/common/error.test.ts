import { EntityNotFoundError, withGlobalErrorHandler } from "./error";
import { ZodError } from "zod";
import type { LambdaResult } from "../aws/lambda";
import { contextFake, eventFake } from "../../../tests/fake/aws.fake";

describe("error", () => {
  describe("withGlobalErrorHandler", () => {
    test("should run handler", async () => {
      // Arrange
      const expected = {};
      const handler = (_event: unknown): Promise<unknown> => {
        return Promise.resolve(expected);
      };

      // Act
      const wrappedHandler = withGlobalErrorHandler(handler);
      const actual = await wrappedHandler(eventFake, contextFake);

      // Assert
      expect(actual).toBe(expected);
    });

    type ErrorTestCase = {
      type: string;
      error: Error;
      expected: LambdaResult;
    };

    test.each<ErrorTestCase>([
      {
        type: "user error for zod parsing error",
        expected: {
          statusCode: 400,
        },
        error: new ZodError([{ message: "", path: [""], code: "custom" }]),
      },
      {
        type: "user error for not found entity error",
        expected: {
          statusCode: 404,
        },
        error: new EntityNotFoundError(),
      },
      {
        type: "server error any unknown error",
        expected: {
          statusCode: 500,
        },
        error: new Error(),
      },
    ])("should return $type", async ({ expected, error }) => {
      // Arrange
      const handler = (_event: unknown): Promise<unknown> => {
        return Promise.reject(error);
      };

      // Act
      const wrappedHandler = withGlobalErrorHandler(handler);
      const actual = await wrappedHandler(eventFake, contextFake);

      // Assert
      expect(actual).toMatchObject(expected);
    });
  });
});
