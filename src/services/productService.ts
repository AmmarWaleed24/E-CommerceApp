import { productModel } from "../models/productModel";
interface ProductParams {
  title: string;
  image: string;
  price: Number;
  stock: Number;
}
export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProduct = async () => {
  const products = [
    {
      title: "dell laptop",
      image:
        "https://th.bing.com/th?id=OIF.PWAE5iFGucSf%2f3H2jTREIQ&rs=1&pid=ImgDetMain",
      price: 15,
      stock: 25,
    },
  ];

  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};

export const checkExistingProdcut = async (productTitle: any) => {
  const data = await getAllProducts();
  data.map((product) => {
    if (product.title === productTitle) {
      console.log("This item is already exists!!");
    }
  });
};

export const addAProduct = async ({
  title,
  image,
  price,
  stock,
}: ProductParams) => {
  const productExist = await productModel.findOne({ title });
  if (productExist) {
    return { data: "Product already exists!", statusCode: 400 };
  }
  const newProduct = new productModel({
    title,
    image,
    price,
    stock,
  });
  newProduct.save();
  return { data: { title, image, price, stock }, statusCode: 200 };
};
