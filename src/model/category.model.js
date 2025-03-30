import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    food: {
        type: mongoose.SchemaTypes.Array,
        ref: "Food",
    },
}, {
    collection: "categories",
    timestamps: true,
    versionKey: false,
})

export default mongoose.model("Category", categorySchema)