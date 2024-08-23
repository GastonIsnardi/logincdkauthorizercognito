import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { LambdaConfig } from "../../../interfaces/json";

export interface LambdaApiGatewayConfig {
  routes: ApiRouteConfig[];
}

export interface ApiGatewayConstructProps {
  lambdas: { [name: string]: lambda.Function };
  config: LambdaConfig[];
}

export interface ApiRouteConfig {
  path: string;
  methods: string[];
  authorizationType: keyof typeof apigateway.AuthorizationType; // Aquí aseguramos que use un tipo consistente
  requestParameters?: { [param: string]: boolean };
}
