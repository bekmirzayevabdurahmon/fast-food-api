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
        { $push: { orders: order._id } }
      );
      await orderItem.save();
    }

    await order.save();
    res.status(201).json({ message: "Buyurtma yaratildi" });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find()
      .populate({ path: "orderItems", populate: "food" })
      .populate("user");

    res.send({ message: "success", count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

const getOneOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    
    if (!isValidObjectId(orderId)) {
      throw new BaseException("Invalid order ID", 400);
    }

    const order = await orderModel
      .findById(orderId)
      .populate({ path: "orderItems", populate: "food" })
      .populate("user");

    if (!order) {
      throw new BaseException("Buyurtma topilmadi", 404);
    }
    res.send({ message: "success", data: order });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    
    const { status } = req.body;
    if (!isValidObjectId(orderId)) {
      throw new BaseException("Invalid order ID", 400);
    }
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      throw new BaseException("Buyurtma topilmadi", 404);
    }
    res.send({ message: "Status yangilandi", data: order });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    if (!isValidObjectId(orderId)) {
      throw new BaseException("Invalid order ID", 400);
    }
    const order = await orderModel.findByIdAndDelete(orderId);
    if (!order) {
      throw new BaseException("Buyurtma topilmadi", 404);
    }
    res.send({ message: "Buyurtma o'chirildi" });
  } catch (error) {
    next(error);
  }
};

export default { createOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder };
