import { isValidObjectId } from "mongoose";
import { BaseException } from "../exception/base.exception.js";
import userModel from "../model/user.model.js";
import foodModel from "../model/food.model.js";
import orderModel from "../model/order.model.js";
import orderItemModel from "../model/order-item.model.js";

const createOrder = async (req, res, next) => {
  try {
    const { userId, orderItems } = req.body;

    if (!isValidObjectId(userId)) {
      throw new BaseException(
        `Given ID: ${userId} is not valid Object ID`,
        400
      );
    }

    const user = await userModel.findById(userId);

    if (!user) {
      throw new BaseException(`Foydalanuvchi topilmadi`, 404);
    }

    let totalPrice = 0;
    for (let oi of orderItems) {
      const food = await foodModel.findById(oi.foodId);

      if (!food) {
        throw new BaseException("Taom topilmadi", 404);
      }

      totalPrice += food.price * oi.quantity;
    }

    const order = new orderModel({
      totalPrice,
      user: userId,
    });

    for (let oi of orderItems) {
      const orderItem = new orderItemModel({
        food: oi.foodId,
        order: order._id,
        quantity: oi.quantity,
      });

      order.orderItems.push(orderItem._id);
      await userModel.updateOne(
        { _id: userId },
        {
          $push: {
            orders: order._id,
          },
        }
      );
      await orderItem.save();
    }

    await order.save();

    res.status(201).json({
      message: "Buyurtma yaratildi",
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find()
      .populate({
        path: "orderItems",
        populate: "food",
      })
      .populate("user");

    res.send({
      message: "success",
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export default { createOrder, getAllOrders };
