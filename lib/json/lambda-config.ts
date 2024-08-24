import { LambdaConfig } from "../stack/interfaces/interfaces";

export const lambdaConfig: LambdaConfig[] = [
  {
    name: "healthCheck1",
    handler: "healthCheck.handler",
    codePath: "src/healthCheck/",
    environment: {
      MY_ENV_VAR: "value1",
    },
    apiGateway: {
      routes: [
        {
          path: "/health-check",
          methods: ["GET"],
          authorizationType: "COGNITO",
        },
      ],
    },
  },
  {
    name: "healthCheck2",
    handler: "healthCheck.handler",
    codePath: "src/healthCheck/",
    environment: {
      MY_ENV_VAR: "value1",
    },
    apiGateway: {
      routes: [
        {
          path: "test/health-check",
          methods: ["GET"],
          authorizationType: "NONE",
        },
      ],
    },
  },
  {
    name: "createUser",
    handler: "createUser.handler",
    codePath: "src/auth/",
    environment: {
      MY_ENV_VAR: "value1",
      COGNITO_USER_POOL_CLIENT_ID: "us-east-1_szKhA9P5t",
    },
    apiGateway: {
      routes: [
        {
          path: "/auth/createuser",
          methods: ["POST"],
          authorizationType: "NONE",
        },
      ],
    },
  },
];
