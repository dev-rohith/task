import express from "express";
import cors from "cors";

import productCtrl from "./controllers/product-controller.js";
import {
  handleUploadErrors,
  upload,
  uploadToCloudinary,
} from "./middleware/image-upload.js";
import cartCtrl from "./controllers/cart-controller.js";

const app = express();

app.use(cors());

app.use(express.json());

//product routes
app.get("/products", productCtrl.getProducts);
app.get("/products/:id", productCtrl.getProduct);
app.post(
  "/products",
  upload.single("image"),
  uploadToCloudinary,
  handleUploadErrors,
  productCtrl.createProduct
);
app.put(
  "/products/:id",
  upload.single("image"),
  uploadToCloudinary,
  handleUploadErrors,
  productCtrl.updateProduct
);
app.delete("/products/:id", productCtrl.deleteProduct);

//cart routes

app.post('/cart/add-item', cartCtrl.addItemToCart)
app.post('/cart/remove-item', cartCtrl.removeItemFromCart)
app.get('/cart', cartCtrl.getCart)


export default app;
