const errorHandler = (err, req, res, next) => {
    let { statusCode, message,isOperational } = err;
    console.log(err);
    message=isOperational ? message : "Internal Server Error";
    res.status(statusCode || 500).json(message ||  "Internal Server Error");
}

export default errorHandler;