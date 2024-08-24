import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// Importar el archivo TypeScript con la configuración
import { LambdaConstruct } from "./stack/lambda/lambdaStack";
import { CognitoConstruct } from "./stack/cognito/cognito";
import { ApiGatewayConstruct } from "./stack/apiGateway/apiGateway";
import { lambdaConfig } from "../lib/json/lambda-config";

export class LoginStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear el User Pool de Cognito
    const cognitoConstruct = new CognitoConstruct(this, "CognitoConstruct", {
      userPoolName: "MyUserPool",
    });

    // Crear las funciones Lambda usando el construct LambdaConstruct
    const lambdaConstruct = new LambdaConstruct(this, "LambdaConstruct", {
      lambdaConfig,
    });

    // Crear el API Gateway usando el construct ApiGatewayConstruct
    new ApiGatewayConstruct(
      this,
      "ApiGatewayConstruct",
      {
        lambdas: lambdaConstruct.lambdas,
        config: lambdaConfig,
      },
      cognitoConstruct
    );
  }
}
