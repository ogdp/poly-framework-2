import joi from "joi";
const sizesSchema = joi.object({
  size: joi.any().required(),
  quantity: joi.number().required(),
});
const ProductSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Trường tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  price: joi.number().required().messages({
    "string.empty": "Trường price không được để trống",
    "any.required": "Trường price là bắt buộc",
  }),
  salePrice: joi.any(),
  images: joi.array().items(joi.string().uri()).required().messages({
    "string.empty": "Trường images không được để trống",
    "any.required": "Trường images là bắt buộc",
  }),
  sizes: joi.array().items(sizesSchema).required(),
  description: joi.string().required().messages({
    "string.empty": "Trường description không được để trống",
    "any.required": "Trường description là bắt buộc",
  }),
  views: joi.any(),
  CategoryId: joi.string().required().messages({
    "string.empty": "Trường CategoryId không được để trống",
    "any.required": "Trường CategoryId là bắt buộc",
  }),
});

export default ProductSchema;
