import type { LambdaHandler, User } from "@shared";
import { findAllUsers, withGlobalErrorHandler } from "@shared";

const lambdaHandler: LambdaHandler<User[]> = async () => {
  return await findAllUsers();
};

export const handler = withGlobalErrorHandler(lambdaHandler);
