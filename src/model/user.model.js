import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        email: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        },
        password: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
        phoneNumber: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
            minLength: 9,
            maxLength: 9,
            match: /^(9[012345789]|6[125679]|7[012345689]|3[3]|8[8]|2[0]|5[05])[0-9]{7}$/,
        },
        imageUrl: {
            type: mongoose.SchemaTypes.String,
            require: false,
        },
    },
    {
        collection: "users",
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", userSchema)