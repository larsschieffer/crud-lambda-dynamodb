import type { LambdaEvent, LambdaHandler, User } from "@shared";
import { updateUser, withGlobalErrorHandler } from "@shared";

const lambdaHandler: LambdaHandler<User> = async (event: LambdaEvent) => {
  const { id } = event.pathParameters || {};
  const user = event.body ? JSON.parse(event.body) : {};

  return await updateUser(id, user);
};

export const handler = withGlobalErrorHandler(lambdaHandler);
