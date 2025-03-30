import { isValidObjectId } from "mongoose";
import categoryModel from "../model/category.model.js";
import foodModel from "../model/food.model.js";
import productModel from "../model/food.model.js"

const getAllFoods = async (req, res) => {
    const products = await productModel
    .find()
    .populate("category", "-food -createdAt -updatedAt")
    .select(["-createdAt", "-updatedAt" ])

    res.send({
        message: "Succes",
        count: products.length,
        data: products,
    });
};

const getOneFood = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`,
        });
    };

    const product = await foodModel.findById(id).populate("category");

    res.send({
        message: "Succes",
        data: product,
    });
};

const createFood = async (req, res) => {
    const { name, price, category, description, imageUrl} = req.body;

    const foundedCategory = await categoryModel.findById(category);

    if(!foundedCategory){
        return res.status(404).send({
            message: `Category with ID: ${category} not found`,
        });
    }

    const food = await productModel.create({
        name,
        price,
        category,
        description,
        imageUrl,
    })

    await categoryModel.updateOne(
        { _id: category},
        {
            $push: {
                food: food._id,
            },
        }
    );

    res.status(201).send({
        message: "Succes",
        data: food,
    })
};

const updateFood = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    if(!isValidObjectId(id)){
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`,
        });
    };

    const food = await foodModel.findByIdAndUpdate(
        id,
        {
            name,
            description,
            price,
        },
        {
            new: true,
        }
    );

    res.send({
        message: "yangilandi",
        data: food,
    });
};

const deleteFood = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`,
        });
    };

    await foodModel.deleteOne({ _id: id });
}

export default { getAllFoods, getOneFood, createFood, updateFood, deleteFood };
