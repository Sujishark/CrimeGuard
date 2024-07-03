const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db');



/**
 * Fetch all weapons
 * @returns {Promise<Weapon>}
 */
const fetchWeaponService = async () => {
    let data = await db.fetchWeapon()
    return data
};


module.exports = {
    fetchWeaponService
};
