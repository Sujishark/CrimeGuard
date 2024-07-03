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
    let created = await db.addUser(userBody)
    return created
};

/**
 * Fetch the details of a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const fetchUserService = async (userBody) => {
    let userData = await db.fetchUser(userBody)
    return userData
};


/**
 * Fetch the details of all users
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const fetchAllUsersService = async () => {
    let userData = await db.fetchAllUsers()
    return userData
};
/**
 * Updates the details of a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const updateUserService = async (userBody, userId) => {
    let created = await db.updateUser(userBody, userId)
    return created
};


/**
 * logs in a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const loginUserService = async (userBody) => {
    userData = await db.findUserByEmail(userBody)
    if (!userData) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password does not exist');
    }
    if (userData.password != userBody.password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password does not exist');
    }

    return userData.exists
};

const deleteUserService = async (userId) => {
    userData = await db.findUserById(userId)
    if (!userData) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }
    let deleted = await db.deleteUser(userId)
    return deleted
}




module.exports = {
    createUserService,
    fetchAllUsersService,
    fetchUserService,
    loginUserService,
    updateUserService,
    deleteUserService
};
