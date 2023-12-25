import type { LambdaEvent, LambdaHandler } from "@shared";
import { deleteUserById, withGlobalErrorHandler } from "@shared";

const lambdaHandler: LambdaHandler = async (event: LambdaEvent) => {
  const { id } = event.pathParameters || {};

  return await deleteUserById(id);
};

export const handler = withGlobalErrorHandler(lambdaHandler);
