import type { ZodErrorMap, ErrorMapCtx, ZodIssueOptionalMessage } from "zod";
import { ZodError, ZodIssueCode, setErrorMap } from "zod";
import type { LambdaHandler } from "../aws/lambda";

export class EntityNotFoundError extends Error {}

const customErrorMap: ZodErrorMap = (
  issue: ZodIssueOptionalMessage,
  ctx: ErrorMapCtx,
) => {
  if (issue.code === ZodIssueCode.invalid_type && ctx.data == null) {
    return { message: `${issue.path} is required` };
  }

  if (issue.code === ZodIssueCode.invalid_type) {
    return { message: `${ctx.data} is invalid for ${issue.path}` };
  }

  if (issue.code === ZodIssueCode.unrecognized_keys) {
    return { message: `value for ${issue.keys[0]} is not allowed` };
  }

  return { message: ctx.defaultError };
};

setErrorMap(customErrorMap);

export const withGlobalErrorHandler = <T>(
  handler: LambdaHandler<T>,
): LambdaHandler<T> => {
  return async (...args: Parameters<LambdaHandler<T>>) => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      console.error("Error in error handling middleware:", error);

      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            message: error.issues[0].message,
          }),
        };
      }

      if (error instanceof EntityNotFoundError) {
        return {
          statusCode: 404,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            message: "Entity not found",
          }),
        };
      }

      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: "An unexpected error occurred. Please try again later.",
        }),
      };
    }
  };
};
