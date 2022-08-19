const handleErrors = (err, req, res, next) => {
    return res.status(500).json({
        code: -1,
        msg: err.message,
        data: [],
    });
}

module.exports = handleErrors;