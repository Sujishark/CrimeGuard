const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db');

/**
 * Create a crime
 * @param {Object} crimeBody
 * @returns {Promise<User>}
 */
const createNotification = async (data) => {
    let { success, id } = await db.addNotification(data)
    return { success, id }
};


/**
 * Fetch the details of all crimes
 * @param {Object} filter
 * @returns {Promise<User>}
 */
const fetchNotificationForUser = async (userId) => {
    let data = await db.fetchNotificationsForUserId(userId)
    return data
};

const fetchLatestNotification = async (userId,crimeId) => {
    let created = await db.fetchLatestNotificationsForUserId(userId, crimeId)
    return created
}

const deleteUserSubscription = async (userId,crimeId) => {
    let created = await db.deleteUserNotificationSubscription(userId,crimeId);
    return created;
}

const addUserSubscription = async (userId,crimeId) => {
    let created = await db.addUserNotificationSubscription(userId,crimeId);
    return created;
}

module.exports = {
    createNotification,
    fetchNotificationForUser,
    fetchLatestNotification,
    deleteUserSubscription,
    addUserSubscription
};
