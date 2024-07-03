const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db');



/**
 * Fetch all weapons
 * @returns {Promise<Weapon>}
 */
const fetchPlaceService = async () => {
    let data = await db.fetchPlace()
    return data
};


module.exports = {
    fetchPlaceService
};
