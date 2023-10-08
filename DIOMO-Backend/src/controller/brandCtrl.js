const Brand = require("../models/brandModel");
const validateMongoId = require("../utils/updateMongoId");


// Create New Brand
const createBrand = async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
};

// Update Brand
const updateBrand = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBrand);
    } catch (error) {
        throw new Error(error);
    }
};

// Update Brand
const deleteBrand = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand);
    } catch (error) {
        throw new Error(error);
    }
};

// Get Brand
const getBrand = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const getBrand = await Brand.findById(id);
        res.json(getBrand);
    } catch (error) {
        throw new Error(error);
    }
};

// Get Brand
const getAllBrand = async (req, res) => {
    // const { id } = req.params;
    // validateMongoId(id);
    try {
        const getAllBrand = await Brand.find();
        res.json(getAllBrand);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand };