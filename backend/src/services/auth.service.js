const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUserService = async (userBody) => {
    userData = await db.findUserByEmail(userBody.email)
    if (userData) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    let {success, id} = await db.addUser(userBody)
    return {success, id}
};


/**
 * logs in a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const loginUserService = async (userBody) => {
    userData = await db.findUserByEmail(userBody.email)
    if (!userData) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password does not exist');
    }
    if (userData.password != userBody.password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password try again');
    }
    return userData;
};





module.exports = {
    createUserService,
    loginUserService,  
};
