import type {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

export type LambdaEvent = APIGatewayProxyEventV2;
export type LambdaResult<T = never> = APIGatewayProxyResultV2<T>;
export type LambdaContext = APIGatewayEventRequestContextV2;

export type LambdaHandler<T = never> = (
  event: LambdaEvent,
  context: LambdaContext,
) => Promise<LambdaResult<T>>;
