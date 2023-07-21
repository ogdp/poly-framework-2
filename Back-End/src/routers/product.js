import express from "express";
import { checkPermission } from "../middlewares/CheckPermission.js";
import {
  CreateProduct,
  SearchProductByName,
  GetallProduct,
  RemoveProduct,
  UpdateProduct,
  getOneProduct,
  FilterProductByPrice,
  FilterProductByCategory,
  FilterProductBySalePrice,
  FilterProductBySize,
  ProductSortByName,
} from "../controllers/product.js";
const RouterProduct = express.Router();

RouterProduct.get("/search", SearchProductByName);
RouterProduct.get("/sortyes", ProductSortByName);
RouterProduct.get("/filter/price", FilterProductByPrice);
RouterProduct.get("/filter/size/:size", FilterProductBySize);
RouterProduct.get("/filter", FilterProductByCategory);
RouterProduct.get("/sale", FilterProductBySalePrice);
RouterProduct.get("/", GetallProduct);
RouterProduct.get("/:id", getOneProduct);
RouterProduct.post("/", checkPermission, CreateProduct);
RouterProduct.patch("/:id", UpdateProduct);
RouterProduct.delete("/:id", checkPermission, RemoveProduct);

export default RouterProduct;
