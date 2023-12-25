import type { LambdaEvent, LambdaHandler, User } from "@shared";
import { createUser, withGlobalErrorHandler } from "@shared";

const lambdaHandler: LambdaHandler<User> = async (event: LambdaEvent) => {
  const user = event.body ? JSON.parse(event.body) : {};

  return await createUser(user);
};

export const handler = withGlobalErrorHandler(lambdaHandler);
