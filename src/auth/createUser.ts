import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { APIGatewayProxyEvent } from "aws-lambda";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

export const signup = async (event: APIGatewayProxyEvent) => {
  const { password, email, nombre, apellido } = JSON.parse(event.body || "{}");
  if (!password || !email || !nombre || !apellido) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Faltan datos requeridos" }),
    };
  }
  const params = {
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "given_name",
        Value: nombre,
      },
      {
        Name: "family_name",
        Value: apellido,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await client.send(command);
    return {
      statusCode: 200,
      multiValueHeaders: {
        "Content-Type": ["application/json"],
      },
      body: JSON.stringify({ response }),
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      statusCode: 500,
      multiValueHeaders: {
        "Content-Type": ["application/json"],
      },
      body: JSON.stringify({
        message: errorMessage,
      }),
    };
  }
};
