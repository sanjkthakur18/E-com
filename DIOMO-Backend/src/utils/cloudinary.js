/* const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

// Image Uploading
const cloudinaryUploadImg = async (fileToUpload) => {
  return new Promise(async (resolve, reject) => {

    try {
      const response = await cloudinary.uploader.upload(fileToUpload);
      resolve(
        {
          url: response.secure_url,
          public_id: response.public_id,
        }
      );
      console.log("Response from Cloudinary: ",response);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = { cloudinaryUploadImg }; */
/*  */