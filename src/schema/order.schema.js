import Joi from "joi";

const orderItemSchema = Joi.object({
  foodId: Joi.string().required(),
  quantity: Joi.number().positive().required(),
}).required();

export const createOrderSchema = Joi.object({
  userId: Joi.string().required(),
  orderItems: Joi.array().items(orderItemSchema).required(),
});