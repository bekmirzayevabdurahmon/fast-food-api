import categoryModel from "../model/category.model.js";
import foodModel from "../model/food.model.js";
import productModel from "../model/food.model.js"

const getAllFoods = async (req, res) => {
    const products = await productModel.find().populate("category")

    res.send({
        message: "Succes",
        count: products.length,
        data: products,
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
}

export default { getAllFoods, createFood };
