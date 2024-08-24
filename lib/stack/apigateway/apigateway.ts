import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { ApiGatewayConstructProps } from "./interfaces/interfaces";
import { CognitoConstruct } from "../cognito/cognito";

export class ApiGatewayConstruct extends Construct {
  public readonly api: apigateway.RestApi;

  constructor(
    scope: Construct,
    id: string,
    props: ApiGatewayConstructProps,
    cognitoConstruct: CognitoConstruct
  ) {
    super(scope, id);

    this.api = new apigateway.RestApi(this, "MyApi", {
      restApiName: "My Service API",
      description: "This service serves my Lambda functions.",
    });

    props.config.forEach((lambdaConfig) => {
      const lambdaFunction = props.lambdas[lambdaConfig.name];

      lambdaConfig.apiGateway?.routes.forEach((route) => {
        const resource = this.api.root.resourceForPath(route.path);

        // Declarar tipo de authorizer explícitamente
        let authorizer: apigateway.IAuthorizer | undefined;

        if (route.authorizationType === "COGNITO") {
          authorizer = new apigateway.CognitoUserPoolsAuthorizer(
            this,
            `${lambdaConfig.name}Authorizer`,
            {
              cognitoUserPools: [cognitoConstruct.userPool],
            }
          );
        }

        route.methods.forEach((method) => {
          const lambdaIntegration = new apigateway.LambdaIntegration(
            lambdaFunction
          );

          resource.addMethod(method, lambdaIntegration, {
            authorizationType:
              apigateway.AuthorizationType[
                route.authorizationType as keyof typeof apigateway.AuthorizationType
              ],
            authorizer,
            requestParameters: route.requestParameters || {},
          });
        });
      });
    });
  }
}
