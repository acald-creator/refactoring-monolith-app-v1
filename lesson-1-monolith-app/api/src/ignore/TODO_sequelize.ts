import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

const c = config.dev;

var AWS = require('aws-sdk'), region = c.aws_region, secretName = c.aws_secret_name, secret, decodedBinarySecret

const client = new AWS.SecretsManager({
  region: region,
});

client.getSecretValue({ SecretId: secretName }, function (err, data) {
  if (err) {
    if (err.code === "DecryptionFailureException") {
      // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === "InternalServiceErrorException") {
      // An error occurred on the server side.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === "InvalidParameterException") {
      // You provided an invalid value for a parameter.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === "InvalidRequestException") {
      // You provided a parameter value that is not valid for the current state of the resource.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    } else if (err.code === "ResourceNotFoundException") {
      // We can't find the resource that you asked for.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    }
  } else {
    // Decrypts secret using the associated KMS CMK.
    // Depending on whether the secret is a string or binary, one of these fields will be populated.
    if ("SecretString" in data) {
      secret = data.SecretString;
    } else {
      const buff = Buffer.from(data.SecretBinary, "base64");
      decodedBinarySecret = buff.toString("ascii");
    }
  }
});

const secretJSON = JSON.parse(secret);

export const sequelize = new Sequelize({
  username: secretJSON.username,
  password: secretJSON.password,
  database: secretJSON.dbname,
  host: secretJSON.host,
  dialect: "postgres",
  storage: ":memory:",
});
