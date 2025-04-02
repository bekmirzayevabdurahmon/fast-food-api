import { isValidObjectId } from "mongoose";
import categoryModel from "../model/category.model.js";
import { BaseException } from "../exception/base.exception.js";

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find().populate("foods");

    res.send({
      message: "success",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getOneCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new BaseException(`Given ID: ${id} is not valid Object ID`, 400);
    }

    const category = await categoryModel.findById(id);

    if (!category) {
      throw new BaseException(`Category with ID: ${id} not found`, 404);
    }

    res.send({
      message: "success",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const foundedCategory = await categoryModel.findOne({ name });

    if (foundedCategory) {
      throw new BaseException(`Category: ${name} allaqachon mavjud`, 409);
    }

    const category = await categoryModel.create({ name });

    res.send({
      message: "success",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!isValidObjectId(id)) {
      throw new BaseException(`Given ID: ${id} is not valid Object ID`, 400);
    }

    const foundedCategory = await categoryModel.findOne({ name });

    if (foundedCategory) {
      throw new BaseException(`Category: ${name} allaqachon mavjud`, 409);
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name });

    res.send({
      message: "success",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      throw new BaseException(`Given ID: ${id} is not valid Object ID`, 400);
    }

    const category = await categoryModel.findByIdAndDelete(id);

    res.send({
      message: "success",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
