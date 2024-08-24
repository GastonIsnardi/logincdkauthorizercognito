import * as apigateway from "aws-cdk-lib/aws-apigateway";

export interface ApiRouteConfig {
  path: string;
  methods: string[];
  authorizationType: keyof typeof apigateway.AuthorizationType;
  requestParameters?: { [param: string]: boolean };
}

export interface LambdaConfig {
  name: string;
  handler: string;
  codePath: string;
  environment?: { [key: string]: string };
  apiGateway?: {
    routes: ApiRouteConfig[];
  };
}

export interface ApiGatewayConstructProps {
  lambdas: { [name: string]: any }; // Usualmente sería del tipo lambda.Function, pero para simplicidad lo dejamos como any
  config: LambdaConfig[];
}

export interface ApiRouteConfig {
  path: string;
  methods: string[];
  authorizationType: "COGNITO" | "NONE" | "IAM" | "CUSTOM";
}

export interface LambdaConfig {
  name: string;
  handler: string;
  codePath: string;
  environment?: { [key: string]: string };
  apiGateway?: {
    routes: ApiRouteConfig[];
  };
}
