export interface LambdaConfig {
  name: string;
  handler: string;
  codePath: string;
  environment: { [key: string]: string };
}

export interface Config {
  lambdas: LambdaConfig[];
}
