const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db');

/**
 * Create a crime
 * @param {Object} crimeBody
 * @returns {Promise<User>}
 */
const createCrimeService = async (crimeBody) => {
    let userData = await db.findUserById(crimeBody.reportedBy)
    if (userData) {
        let { success, id } = await db.addCrime(crimeBody)
        return { success, id }
    }
};


/**
 * Fetch the details of all crimes
 * @param {Object} filter
 * @returns {Promise<User>}
 */
const fetchAllCrimesService = async (filters) => {
    let { dateLeft, dateRight, place, crimeType, page, perPage } = filters
    let userData = await db.fetchCrimes(dateLeft, dateRight, place, crimeType, page, perPage)
    return userData
};


/**
 * Fetch latest activity of crimes (home page)
 * @param {Object} filter
 * @returns {Promise<User>}
 */
const fetchLatestActivitiesService = async (filters) => {
    let {page, perPage} = filters
    let data = await db.fetchLatestActivities(page, perPage)
    return data
};


/**
 * Fetch the details of all crime
 * @param {Object} 
 * @returns {Promise<User>}
 */
const fetchCrimeService = async (id) => {
    let userData = await db.fetchCrimeById(id)
    return userData
};

/**
 * Create an Activity
 * @param {Object} crimeBody
 * @returns {Promise<User>}
 */
const createCrimeActivityService = async (data) => {
    let { success, id } = await db.addActivity(data)
    return { success, id }

};

/**
 * Fetch Activities for the crime
 * @param {Object} crimeBody
 * @returns {Promise<User>}
 */
const fetchActivityForCrimeId = async (id) => {
    let data = await db.fetchActivity(id)
    return data

};

/**
 * Create an Comment for a Crime
 * @param {Object} crimeBody
 * @returns {Promise<User>}
 */
const createCrimeCommentService = async (data) => {
    let { success, id } = await db.addComment(data)
    return { success, id }

};

module.exports = {
    createCrimeService,
    fetchAllCrimesService,
    fetchCrimeService,
    fetchLatestActivitiesService,
    fetchActivityForCrimeId,
    createCrimeActivityService,
    createCrimeCommentService
};
