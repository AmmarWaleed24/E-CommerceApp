import { ObjectId } from "mongoose";
import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totlaPriceAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId });
  if (!cart) cart = await createCartForUser({ userId });

  return cart;
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  //Does the item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "The Item Already in the cart!", statusCode: 400 };
  }
  //Fetch product

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock quantity for item", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });

  cart.totlaPriceAmount += product.price * quantity;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
