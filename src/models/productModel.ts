import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: Number;
  stock: Number;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const productModel = mongoose.model<IProduct>("Product", productSchema);
