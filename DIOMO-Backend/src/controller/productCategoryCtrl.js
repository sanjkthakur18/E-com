const Category = require("../models/productCategoryModel");
const validateMongoId = require("../utils/updateMongoId");


// Create New Category
const createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
};

// Update Category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
};

// Update Category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
};

// Get Category
const getCategory = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const getCategory = await Category.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
};

// Get Category
const getAllCategory = async (req, res) => {
    // const { id } = req.params;
    // validateMongoId(id);
    try {
        const getAllCategory = await Category.find();
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory };