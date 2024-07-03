const httpStatus = require('http-status');
// const { User } = require('../models');
const db = require('../config/sql');
const ApiError = require('../utils/ApiError');

const connection = db() 

/**
 * Check user exists
 * Add user to db
 * Update user 
 * 
 */
/**
 * Check if a user with this email exists in the database
 * @param {String} userEmail
 * @returns {Boolean}
 */
const findUserByEmail = async (userEmail) => {
    

    try {
        let queryStr = `SELECT count(*)=1 as userExists, id, email, password FROM User WHERE email='${userEmail}' GROUP BY id;`
        console.log(queryStr)
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {
            const userData = rows[0]

            return userData
        }

        return null

    } catch (err) {

        console.log(err)
        return null
    }

}


/**
 * Check user exists
 * Add user to db
 * Update user
 * 
 */
/**
 * Check if a user with this email exists in the database
 * @param {String} userEmail
 * @returns {Boolean}
 */
const findUserById = async (id) => {
    
    let queryStr = `SELECT count(*)=1 as userExists, id, email, password FROM User WHERE id='${id}' GROUP BY id;`
    console.log(queryStr)
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {
            const userData = rows[0]

            return userData
        }

        return null

    } catch (err) {

        console.log(err)
        return null
    }

}

/**
 * Add user to the users table
 * @param {String} userEmail
 * @returns {Boolean}
 */
const addUser = async (user) => {
    
    let queryStr = `INSERT INTO User (firstName, lastName, phoneNumber, email, password, gender, houseNameWithNumberBlock, addressStreet, location) VALUES
    ('${user.firstName}','${user.lastName}',${user.phoneNumber},'${user.email}','${user.password}','${user.gender}','${user.houseNameWithNumberBlock}','${user.addressStreet}',ST_GeomFromText('POINT(${user.location})'));`
    console.log(queryStr)
    const [rows, fields] = await connection.execute(queryStr)
    console.log(rows, fields)

    return { success: rows.affectedRows == 1, id: rows.insertId }
}

/**
 * Fetch all users from the users table
 * @param {String} userId
 * @returns {Boolean}
 */
const fetchAllUsers = async (userId) => {
    
    let queryStr = `SELECT * FROM User`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {

            return rows
        }

        return null

    } catch (err) {
        console.log(err)

        return null
    }
}


/**
 * Fetch user from the users table
 * @param {String} userId
 * @returns {Boolean}
 */
const fetchUser = async (userId) => {
    
    let queryStr = `SELECT * FROM User WHERE id=${userId}`
    try {

        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {
            const userData = rows[0]
            console.log(userData)

            return userData
        }

        return null

    } catch (err) {

        console.log(err)
        return null
    }
}


/**
 * Update user to the users table
 * @param {String} userEmail
 * @returns {Boolean}
 */
const updateUser = async (user, id) => {
    
    let queryStr = `UPDATE User SET firstName='${user.firstName}', lastName='${user.lastName}', phoneNumber=${user.phoneNumber}, email='${user.email}', gender='${user.gender}', houseNameWithNumberBlock='${user.houseNameWithNumberBlock}', addressStreet='${user.addressStreet}' WHERE id=${id}`
    console.log(queryStr)
    const [rows, fields] = await connection.execute(queryStr)

    return rows.affectedRows == 1
}

/**
 * Delete user to the users table
 * @param {String} userEmail
 * @returns {Boolean}
 */
const deleteUser = async (id) => {
    
    let queryStr = `Delete from User where id='${id}'`
    console.log(queryStr)
    const [rows, fields] = await connection.execute(queryStr)

    return rows.affectedRows == 1
}

/**
 * Add crime to the crimes table
 * @param {String} crime
 * @returns {Boolean}
 */
const addCrime = async (crime) => {
    
    let queryStr = `INSERT INTO Crime (reportedTimestamp, mappingAddress, location, description, crimeTypeId, placeId,reportedBy) VALUES 
    ('${crime.reportedTimestamp}','${crime.mappingAddress}', ST_GeomFromText('POINT(${crime.location})'),'${crime.description}','${crime.crimeTypeId}','${crime.placeId}','${crime.reportedBy}');`
    console.log(queryStr)
    const [rows, fields] = await connection.execute(queryStr)
    let crimeWeapons = crime.weapons.split(',');
    for (let weapon of crimeWeapons) {
        if (weapon) {
            queryStr = `INSERT INTO CrimeWeapon (crimeId, weaponId) VALUES (${rows.insertId},${weapon})`
            console.log(queryStr)
            await connection.execute(queryStr)
        }
    }
    queryStr = `INSERT INTO CrimeWeapon`
    console.log(rows, fields)

    return { success: rows.affectedRows == 1, id: rows.insertId }
}
/**
 * Fetch all crimes from the crimes table
 * @param {}
 * @returns {Boolean}
 */
const fetchCrimes = async (dateLeft, dateRight, place, crimeType, page = 1, perPage = 10) => {
    
    console.log(page, perPage)
    let queryStr = `CALL fetchLatestActivityOrCrime('Crime', ${(page * perPage) - perPage}, ${perPage}, NULL, ${crimeType ? crimeType : 'NULL'}, ${place ? place : 'NULL'}, ${dateLeft ? `'${dateLeft}'` : 'NULL'}, ${dateRight ? `'${dateRight}'` : 'NULL'})`

    console.log(queryStr)
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {
            return rows
        }
        return []
    } catch (err) {
        console.log(err)
        return null
    }
}

/**
 * Fetch all crimes from the crimes table
 * @param {}
 * @returns {Boolean}
 */
const fetchLatestActivities = async (page = 1, perPage = 10) => {
    
    let queryStr = `CALL fetchLatestActivityOrCrime('LatestActivity', ${(page * perPage) - perPage}, ${perPage}, NULL, NULL, NULL, NULL, NULL)`

    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {
            return rows
        }
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}

/**
  * Fetch user from the users table
 * @param {String} userId
 * @returns {Boolean}
 */
const fetchCrimeById = async (id) => {
    
    let queryStr = `CALL fetchLatestActivityOrCrime('Crime', 0, 10, ${id}, NULL, NULL, NULL, NULL)`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {
            const userData = rows[0]
            console.log(userData)

            return userData
        }

        return null

    } catch (err) {
        console.log(err)

        return null
    }
}

/**
 * Fetch places from the places table
 * @returns {Boolean}
 */
const fetchPlace = async () => {
    
    let queryStr = `SELECT * FROM Place`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {

            return rows
        }

        return []

    } catch (err) {

        console.log(err)
        return []
    }
}


/**
 * Fetch crime types from the crimeTypes table
 * @returns {Boolean}
 */
const fetchCrimeType = async () => {
    
    let queryStr = `SELECT * FROM CrimeType ORDER BY description ASC`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {
            // 
            return rows
        }

        return []

    } catch (err) {

        console.log(err)
        return []
    }
}



/**
 * Fetch weapon from the weapons table
 * @returns {Boolean}
 */
const fetchWeapon = async () => {
    
    let queryStr = `SELECT * FROM Weapon`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {

            return rows
        }

        return []

    } catch (err) {

        console.log(err)
        return []
    }
}


// INSERT INTO Activity (crimeId, status, viewCount, createdAt, updatedAt)
// VALUES (1, 'In Progress', 0, NOW(), NOW());
/**
 * Add activity to the activity table
 * @param {String} crime
 * @returns {Boolean}
 */
const addActivity = async (data) => {
    
    let queryStr = `UPDATE Crime SET latestStatus = '${data.status}' WHERE id = ${data.crimeId};`
    const [rows, fields] = await connection.execute(queryStr)

    console.log(rows, fields)
    return { success: rows.affectedRows == 1, id: rows.insertId }
}
/**
 * Fetch activity for the crime id from the activity table
 * @param {String} crime
 * @returns {Boolean}
 */
const fetchActivity = async (id) => {
    
    let queryStr = `SELECT * FROM Activity where crimeId=${id}`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {

            return rows
        }

        return []

    } catch (err) {

        console.log(err)
        return []
    }
}

/**
 * Add comment to the comments table
 * @param {String} crime
 * @returns {Boolean}
 */
const addComment = async (data) => {
    
    let queryStr = `INSERT INTO Comment (crimeId, userId, body) VALUES 
    ('${data.crimeId}','${data.userId}','${data.body}');`
    console.log(queryStr)
    const [rows, fields] = await connection.execute(queryStr)

    console.log(rows, fields)
    return { success: rows.affectedRows == 1, id: rows.insertId }
}


/**
 * Fetch comment for crime from comments table
 * @returns {Boolean}
 */
const fetchCommentsforCrimeId = async (crimeId) => {
    
    let queryStr = `SELECT
            Comment.id AS CommentID,
            Comment.body,
            Comment.createdAt AS CommentCreatedAt,
            User.id AS UserID,
            User.firstName,
            User.lastName,
            User.phoneNumber,
            User.email,
            User.gender,
            User.location
        FROM
            Comment
        JOIN
            User ON Comment.userId = User.id
        WHERE Comment.crimeId=${crimeId}`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {

            return rows
        }

        return []

    } catch (err) {

        console.log(err)
        return []
    }
}
/**
 * Add notification to the notification table
 * @param {String} crime
 * @returns {Boolean}
 */
const addNotification = async (data) => {
    
    let queryStr = `INSERT INTO Notification (userId, activityId, bannerContent, bannerNavigation) VALUES
    ('${data.userId}','${data.activityId}','${data.bannerContent}','${data.bannerNavigation}');`
    const [rows, fields] = await connection.execute(queryStr)

    console.log(rows, fields)
    return { success: rows.affectedRows == 1, id: rows.insertId }
}

/**
 * Get notifications for user 
 * @returns {Boolean}
 */
const fetchNotificationsForUserId = async (userId) => {
    
    let queryStr = `SELECT * FROM Notification where userId=${userId} order by createdAt desc;`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {

            return rows
        }

        return []

    } catch (err) {

        console.log(err)
        return []
    }
}

const fetchLatestNotificationsForUserId = async (userId, crimeId) => {
    
    let queryStr = `SELECT * FROM Notification where userId=${userId} and bannerNavigation=${crimeId} order by createdAt desc limit 1;`
    try {
        const [rows] = await connection.execute(queryStr)
        if (rows.length > 0) {

            return rows
        }

        return []

    } catch (err) {

        console.log(err)
        return []
    }
}

const addUserNotificationSubscription = async (userId, crimeId) => {
    
    let queryStr = `INSERT INTO Subscription (userId, crimeId) VALUES
    ('${userId}','${crimeId}');`
    console.log(queryStr)
    const [rows, fields] = await connection.execute(queryStr)

    return rows.affectedRows == 1
}

const deleteUserNotificationSubscription = async (userId, crimeId) => {
    
    let queryStr = `Delete from Subscription where userId=${userId} and crimeId=${crimeId}`
    console.log(queryStr)
    const [rows, fields] = await connection.execute(queryStr)

    return rows.affectedRows == 1
}

module.exports = {
    findUserByEmail,
    findUserById,
    addUser,
    fetchAllUsers,
    fetchUser,
    updateUser,
    deleteUser,
    addCrime,
    fetchCrimes,
    fetchCrimeById,
    fetchLatestActivities,
    fetchPlace,
    fetchCrimeType,
    fetchWeapon,
    addActivity,
    fetchActivity,
    addComment,
    fetchCommentsforCrimeId,
    addNotification,
    fetchNotificationsForUserId,
    fetchLatestNotificationsForUserId,
    addUserNotificationSubscription,
    deleteUserNotificationSubscription
}