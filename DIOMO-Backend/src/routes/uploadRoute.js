const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const { uploadImages } = require("../controller/uploadCtrl");


const router = express.Router();

// router.put("/upload-img/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10));
// router.delete("/delete-img/:id", authMiddleware, isAdmin)

router.put("/upload-img/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);


module.exports = router;