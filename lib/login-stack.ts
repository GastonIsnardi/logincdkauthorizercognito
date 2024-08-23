import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./stack/lambda/lambdaStack";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LoginStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new LambdaStack(this, "LambdaStack");
  }
}
