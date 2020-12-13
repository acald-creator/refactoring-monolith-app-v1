import { Router, Request, Response } from "express";
import { User } from "../models/Users";
import * as bcrypt from "bcrypt";
import { NextFunction } from "connect";

/* Generate the password */
async function generatePassword(plainTextPassword: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
}
/* Compare the password */
async function comparePasswords(
  plainTextPassword: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hash);
}

/* Generate the JWT token */

/* Authorize the user */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({
      message: "No authorization headers",
    });
  }
  const tokenBearer = req.headers.authorization.split(" ");
  if (tokenBearer.length !== 2) {
    return res.status(401).send({
      message: "Malformed token",
    });
  }
}
