import validateJWT from "../middlewares/validateJWT";
import { addItemToCart, getActiveCartForUser } from "../services/cartService";
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

router.post(
  "/items",
  validateJWT,
  async (req: ExtendRequest, res: Response) => {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  }
);

export default router;
