const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();

const authRouter = require("./src/routes/authRoute");
const productRouter = require("./src/routes/productRoute");
const prodCatRouter = require("./src/routes/productCategoryRoute");
const brandRouter = require("./src/routes/brandRoute");
const uploadRouter = require("./src/routes/uploadRoute");
const couponRouter = require("./src/routes/couponRoute");
const colorRouter = require("./src/routes/colorRoute");
const enqiryRouter = require("./src/routes/enpRoute");

const { notFound, errorHandler } = require("./src/middlewares/errorHandler");

const app = express();

PORT = process.env.PORT || 4000

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
    .connect("mongodb://127.0.0.1:27017/diomo", { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log("db is connected");
    })
    .catch((e) => {
        console.log(`${e}`);
    });

app.get("/", (req, res) => {
    res.status(200).send("Hello");
})
app.get("/api", (req, res, next) => {
    res.status(200).send("API is working");
    next();
});
app.use("/api/users", authRouter);
app.use("/api/products", productRouter);
app.use("/api/pcategories", prodCatRouter);
app.use("/api/brands", brandRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/colors", colorRouter);
app.use("/api/enquiries", enqiryRouter);
app.use("/api/uploads", uploadRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});