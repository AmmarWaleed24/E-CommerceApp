import validateJWT from "../middlewares/validateJWT";
import { getActiveCartForUser } from "../services/cartService";
import express, { Request, Response } from "express";
interface ExtendRequest extends Request {
  user?: any;
}
const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

export default router;
