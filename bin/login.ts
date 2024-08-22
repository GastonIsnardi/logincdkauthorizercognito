#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LoginStack } from "../lib/login-stack";

const app = new cdk.App();
new LoginStack(app, "LoginStack", {});
