import type { LambdaEvent, LambdaHandler, User } from "@shared";
import { findUserById, withGlobalErrorHandler } from "@shared";

const lambdaHandler: LambdaHandler<User> = async (event: LambdaEvent) => {
  const { id } = event.pathParameters || {};

  return await findUserById(id);
};

export const handler = withGlobalErrorHandler(lambdaHandler);
