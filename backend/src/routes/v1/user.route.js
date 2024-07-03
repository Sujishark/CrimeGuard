const express = require('express');
const { updateUserDetailsController, deleteUserController, fetchUserController, fetchAllUsers, fetchAllNotificatiosController, fetchLatestNotificationController, deleteUserSubscriptionController, addUserSubscriptionController } = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Notification APIs
router.route('/:userId/notification').get(fetchAllNotificatiosController)
router.route('/:userId/:crimeId/latestnotification').get(fetchLatestNotificationController)
router.route('/:userId/:crimeId/subscribe').post(addUserSubscriptionController)
router.route('/:userId/:crimeId/unsubscribe').post(deleteUserSubscriptionController)

// User APIs
router.route('/').get(auth(), fetchAllUsers)
router.route('/:userId').get(fetchUserController)
router.route('/:userId').put(updateUserDetailsController)
router.route('/:userId').delete(deleteUserController)

module.exports = router