const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db');

/**
 * Create a crime
 * @param {Object} crimeBody
 * @returns {Promise<User>}
 */
const createComment = async (data) => {
    let { success, id } = await db.addComment(data)
    return { success, id }
};


/**
 * Fetch the details of all crimes
 * @param {Object} filter
 * @returns {Promise<User>}
 */
const fetchCommentForCrime = async (crimeId) => {
    let data = await db.fetchCommentsforCrimeId(crimeId)
    return data
};


module.exports = {
    createComment,
    fetchCommentForCrime,
};
