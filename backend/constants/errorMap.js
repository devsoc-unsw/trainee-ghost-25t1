const errorMap = {
    INVALID_INPUT: { httpStatus: 400 },
    // No update occured should only happen when data provided is the same as
    // the existing sql data, or when the table we want to change is not found,
    // therefore it is a bad request
    NO_UPDATE_OCCURRED: { httpStatus: 400 },
    NO_UPDATE_DATA: { httpStatus: 400 },
    USER_EXISTS: { httpStatus: 409 },
    USER_IN_TEAM: { httpStatus: 409 },
    USER_NOT_FOUND: { httpStatus: 404 },
    TEAM_NOT_FOUND: { httpStatus: 404 },
    RESOURCE_NOT_FOUND: { httpStatus: 404 },
    INVALID_CREDENTIALS: { httpStatus: 401 },
    CONFIG_ERROR: { httpStatus: 500 },
    NO_TEAM_MEMBERSHIP: { httpStatus: 403},
    NO_TEAM_TO_REMOVE_FROM: { httpStatus: 403 },
    FORBIDDEN: { httpStatus: 403 },
    USER_NOT_ADMIN: { httpStatus: 403 }
};

module.exports = errorMap;