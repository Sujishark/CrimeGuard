const jwt = require('jsonwebtoken');
const moment = require('moment');
const { envVars } = require('../config');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = envVars.jwtSecret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};


/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, envVars.jwtSecret);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
};


/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
// const saveToken = async (token, userId, expires, type, blacklisted = false) => {
//     const tokenDoc = await Token.create({
//         token,
//         user: userId,
//         expires: expires.toDate(),
//         type,
//         blacklisted,
//     });
//     return tokenDoc;
// };


/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (id) => {
    const accessTokenExpires = moment().add(envVars.jwtAccessExpirationMinutes, 'minutes');
    const accessToken = generateToken(id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(envVars.jwtRefreshExpirationDays, 'days');
    const refreshToken = generateToken(id, refreshTokenExpires, tokenTypes.REFRESH);
    //should ideally store the refresh token in the db
    // await saveToken(refreshToken, id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};


module.exports = {
    generateToken,
    verifyToken,
    generateAuthTokens
};


