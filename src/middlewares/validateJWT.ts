import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
("jsonwebtoken");
interface ExtendRequest extends Request {
  user?: any;
}
const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization header was not provided!");
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }
  jwt.verify(
    token,
    "nWNQo8JVxvBNMTPN4dQ6rGhU58jCBeztefUpjP8uUjs=",
    async (err, payload) => {
      if (err) {
        res.status(403).send("Invalid Token");
        return;
      }
      if (!payload) {
        res.status(403).send("Invalid Token Payload");
        return;
      }
      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };
      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
