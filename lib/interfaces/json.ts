export interface LambdaConfig {
  name: string;
  handler: string;
  codePath: string;
  environment?: { [key: string]: string };
  apiGateway?: {
    routes: {
      path: string;
      methods: string[];
      authorizationType: string;
      requestParameters?: { [param: string]: boolean };
    }[];
  };
}
