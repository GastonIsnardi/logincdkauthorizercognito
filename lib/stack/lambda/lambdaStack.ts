import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as fs from "fs";
import { Config, LambdaConfig } from "./interfaces/interfaces";

interface lambdaStackProps extends NestedStackProps {}

export class LambdaStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: lambdaStackProps) {
    super(scope, id, props);

    // Cargar configuración desde el archivo JSON y tiparlo
    const lambdaConfig: Config = JSON.parse(
      fs.readFileSync("lib/stack/lambda/lambda-config.json", "utf-8")
    );

    // Crear las funciones Lambda a partir de la configuración
    lambdaConfig.lambdas.forEach((lambdaItem: LambdaConfig) => {
      new lambda.Function(this, lambdaItem.name, {
        functionName: lambdaItem.name,
        runtime: lambda.Runtime.NODEJS_LATEST,
        code: lambda.Code.fromAsset(lambdaItem.codePath),
        handler: lambdaItem.handler,
        environment: lambdaItem.environment,
      });
    });
  }
}
