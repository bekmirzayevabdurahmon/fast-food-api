import { isValidObjectId } from "mongoose";
import categoryModel from "../model/category.model.js";

const getAllCategories = async (req, res) => {
    const categories = await categoryModel.find()

    res.send({
        message: "succes",
        data: categories,
    })
};

const getOneCategory = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)){
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`,
        });
    };

    const category = await categoryModel.findById(id);

    if(!category){
        return res.status(404).send({
            message: `Category with ID: ${id} not found00`,
        });
    };

    res.send({
        message: "Succes",
        data: category,
    });
};

const createCategory = async (req, res) => {
    const { name } = req.body;

    const foundedCategory = await categoryModel.findOne({ name });

    if(foundedCategory) {
        return res.status(409).send({
            message: `Category: ${name} allaqachon mavjud`,
        });
    };

    const category = await categoryModel.create({ name });

    res.send({
        message: "Succes",
        data: category,
    });
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if(!isValidObjectId(id)){
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`,
        });
    }

    const foundedCategory = await categoryModel.findOne({ name });

    if (foundedCategory) {
        return res.status(409).send({
            message: `Category: ${name} allaqachon mavjud`,
        });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name })

    res.send({
        message: "Succes",
        data: updateCategory,
    });
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)){
        return res.status(400).send({
            message: `Given ID: ${id} is not valid Object ID`,
        });
    }

    const category = await categoryModel.deleteOne({_id: id});

    res.send({
        message: "Succes",
        data: category,
    });
};

export default { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory}
