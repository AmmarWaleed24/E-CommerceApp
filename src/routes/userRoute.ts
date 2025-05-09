import express, { request } from "express";
import mongoose from "mongoose";
import { login, register } from "../services/userService";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const result = await register({ firstName, lastName, email, password });
  response.status(result.statusCode).send(result.data);
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { statusCode, data } = await login({ email, password });
  response.status(statusCode).send(data);
});

export default router;
