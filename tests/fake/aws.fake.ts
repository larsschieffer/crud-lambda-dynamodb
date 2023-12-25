import type { LambdaContext, LambdaEvent } from "src/shared/aws/lambda";

export const contextFake: LambdaContext = {
  accountId: "",
  apiId: "",
  domainName: "",
  domainPrefix: "",
  http: {
    method: "",
    path: "",
    protocol: "",
    sourceIp: "",
    userAgent: "",
  },
  requestId: "",
  routeKey: "",
  stage: "",
  time: "",
  timeEpoch: 0,
};

export const eventFake: LambdaEvent = {
  version: "",
  routeKey: "",
  rawPath: "",
  rawQueryString: "",
  headers: {},
  requestContext: contextFake,
  isBase64Encoded: false,
};
