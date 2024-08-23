import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as fs from "fs";
import { LambdaConstruct } from "./stack/lambda/lambdaStack";
import { ApiGatewayConstruct } from "./stack/apigateway/apigateway";
import { LambdaConfig } from "./interfaces/json";

export class LoginStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cargar configuración desde el archivo JSON
    const config: { lambdas: LambdaConfig[] } = JSON.parse(
      fs.readFileSync("lib/json/lambda-config.json", "utf-8")
    );

    // Verificar que config.lambdas es un arreglo
    if (!Array.isArray(config.lambdas)) {
      throw new Error(
        "Invalid lambda configuration: 'lambdas' must be an array."
      );
    }

    // Crear las funciones Lambda usando el construct LambdaConstruct
    const lambdaConstruct = new LambdaConstruct(this, "LambdaConstruct", {
      lambdaConfig: config.lambdas,
    });

    // Crear el API Gateway usando el construct ApiGatewayConstruct
    new ApiGatewayConstruct(this, "ApiGatewayConstruct", {
      lambdas: lambdaConstruct.lambdas,
      config: config.lambdas, // Pasar toda la configuración al construct del API Gateway
    });
  }
}
