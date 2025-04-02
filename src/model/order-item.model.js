import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Food",
      required: true,
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Order",
      required: true,
    },
    quantity: {
      type: mongoose.SchemaTypes.Int32,
      required: true,
      min: 1,
      max: 10000,
      default: 1,
    },
  },
  {
    collection: "order-items",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("OrderItem", OrderItemSchema);