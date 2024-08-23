import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { LambdaConstructProps } from "./interfaces/interfaces";

export class LambdaConstruct extends Construct {
  public readonly lambdas: { [name: string]: lambda.Function } = {};

  constructor(scope: Construct, id: string, props: LambdaConstructProps) {
    super(scope, id);

    props.lambdaConfig.forEach((lambdaItem) => {
      // Crear la función Lambda
      const lambdaFunction = new lambda.Function(this, lambdaItem.name, {
        functionName: lambdaItem.name, // Especifica el nombre de la función
        runtime: lambda.Runtime.NODEJS_LATEST, // runtime ya es asegurado que es un valor único de tipo Runtime
        code: lambda.Code.fromAsset(lambdaItem.codePath),
        handler: lambdaItem.handler,
        environment: lambdaItem.environment,
      });

      // Almacena la función Lambda en un objeto para acceder más tarde
      this.lambdas[lambdaItem.name] = lambdaFunction;
    });
  }
}
