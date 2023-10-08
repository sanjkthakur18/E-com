const express = require("express");
const { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct, addToWhishlist, rating, uploadImages } = require("../controller/productCtrl");
const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware");
// const {  uploadPhoto } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
// router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images",5), uploadImages );
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWhishlist);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProducts);

module.exports = router;