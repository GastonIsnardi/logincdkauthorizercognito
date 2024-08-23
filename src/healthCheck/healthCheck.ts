export const handler = async (event: any) => {
  console.log("Event: ", event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
      ENV: process.env.MY_ENV_VAR,
    }),
  };
};
