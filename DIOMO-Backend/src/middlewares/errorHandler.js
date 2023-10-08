// not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error Hnadler
const errorHandler = (err, req, res, next) => {
    // const statusCode = (res.statusCode == 200) ? res.statusCode : 500;
    // res.status(statusCode);
    // res.json({ message: err?.message, stack: err?.stack, });

    console.log(err);
    next()
};

module.exports = { errorHandler, notFound };