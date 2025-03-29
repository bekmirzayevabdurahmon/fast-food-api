import mongoose, { mongo, MongooseError } from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        price: {
            type: mongoose.SchemaTypes.Number,
            required: true,
            unique: true,
        },
        description: {
            type: mongoose.SchemaTypes.String,
            required: false,
        },
        imageUrl: {
            type: mongoose.SchemaTypes.String,
            required: false,
        },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Category",
        },
    },
    {
        collection: "foods",
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Food", FoodSchema)