const fs = require("fs");
const Product = require("../models/productModel");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const validateMongoDbId = require("../utils/updateMongoId");

const uploadImages = async (req, res) => {
  // console.log("Response from Controller: ",req.files);
  const { id } = req.params;
  validateMongoDbId(id);
  console.log(req.files);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    if (!Array.isArray(files)) {
      throw new Error("No files were uploading");
    }

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log("New Path: ", newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
      console.log("URLS: ", urls);
    }

    const findProduct = await Product.findByIdAndUpdate(id, {
      images: urls,
    });
    if(!findProduct){
      return res.status(404).json({message: "Product not found"});
    }
    console.log(findProduct);
    res.json(findProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = { uploadImages };