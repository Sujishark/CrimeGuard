const express = require('express');
const { registerCrimeController, fetchAllCrimesController, fetchCrimeController, fetchLatestActivityController, fetchCrimeTypes, fetchPlaces, fetchWeapons, fetchComment, createCommentController, fetchAllActivityController, createActivityController } = require('../../controllers/crime.controller');

const router = express.Router();

// Crime Types API
router.route('/type').get(fetchCrimeTypes)

// Places API
router.route('/place').get(fetchPlaces)

// Weapons API
router.route('/weapon').get(fetchWeapons)

// Activity APIs
router.route('/latestActivity').get(fetchLatestActivityController)
router.route('/:id/activity').post(createActivityController)
router.route('/:id/activity').get(fetchAllActivityController)

// Comment APIs
router.route('/comment').post(createCommentController)
router.route('/:id/comment').get(fetchComment)

// Crime APIs
router.route('/').post(registerCrimeController)
router.route('/').get(fetchAllCrimesController)
router.route('/:id').get(fetchCrimeController)

module.exports = router