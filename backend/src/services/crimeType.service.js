const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db');



/**
 * Fetch all weapons
 * @returns {Promise<Weapon>}
 */
const fetchCrimeTypeService = async () => {
    let data = await db.fetchCrimeType()
    return data
};


module.exports = {
    fetchCrimeTypeService
};
