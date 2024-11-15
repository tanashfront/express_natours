exports.catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
};

exports.handleError = (res, statusCode, status, message) => {
    res.status(statusCode).json({
        status: status,
        message: message
    });
}


