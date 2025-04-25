const errorMap = {
    INVALID_INPUT: { httpStatus: 400 },
    USER_EXISTS: { httpStatus: 409 },
    USER_NOT_FOUND: { httpStatus: 404 },
    INVALID_CREDENTIALS: { httpStatus: 401 },
    CONFIG_ERROR: { httpsStatus: 500 }
};

module.exports = errorMap;