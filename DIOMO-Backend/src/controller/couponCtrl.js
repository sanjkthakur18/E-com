const Coupon = require("../models/couponModel");
const validateMongoId = require("../utils/updateMongoId");

// Create Coupon
const createCoupon = async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
};

// Get All Coupon
const getAllCoupon = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error);
    }
};

// Update Coupon
const updateCoupon = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate((id), req.body, {
            new: true,
        });
        res.json(updateCoupon);
    } catch (error) {
        throw new Error(error);
    }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon };