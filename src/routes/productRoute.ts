import express from "express";
import { addAProduct, getAllProducts } from "../services/productService";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.status(200).send(products);
});
router.post("/addProduct", async (req, res) => {
  const { title, image, price, stock } = req.body;
  const result = await addAProduct({ title, image, price, stock });
  res.status(result.statusCode).send(result.data);
});
export default router;
