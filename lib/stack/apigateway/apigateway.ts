import { Construct } from "constructs";
import { ApiGatewayConstructProps } from "./interfaces/interfaces";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { LambdaConfig } from "../../interfaces/json";

export class ApiGatewayConstruct extends Construct {
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props: ApiGatewayConstructProps) {
    super(scope, id);

    // Crear un API Gateway
    this.api = new apigateway.RestApi(this, "MyApi", {
      restApiName: "My Service API",
      description: "This service serves my Lambda functions.",
    });

    // Crear un recurso para cada Lambda en el API Gateway usando la configuración desde JSON
    props.config.forEach((lambdaConfig: LambdaConfig) => {
      const lambdaFunction = props.lambdas[lambdaConfig.name];

      lambdaConfig.apiGateway?.routes.forEach((route) => {
        const resource = this.api.root.resourceForPath(route.path);

        route.methods.forEach((method: string) => {
          const lambdaIntegration = new apigateway.LambdaIntegration(
            lambdaFunction,
            {
              requestTemplates: {
                "application/json": `{ "statusCode": "200" }`,
              },
            }
          );

          // Conversión explícita para asegurar el tipo
          const authorizationType =
            apigateway.AuthorizationType[
              route.authorizationType as keyof typeof apigateway.AuthorizationType
            ];

          resource.addMethod(method, lambdaIntegration, {
            authorizationType: authorizationType,
            requestParameters: route.requestParameters || {},
          });
        });
      });
    });
  }
}
