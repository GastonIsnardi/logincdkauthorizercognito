import * as lambda from "aws-cdk-lib/aws-lambda";
import { LambdaConfig } from "../../../interfaces/json";
export type LambdaRuntime = keyof typeof lambda.Runtime;

export interface LambdaConstructProps {
  lambdaConfig: LambdaConfig[];
}
