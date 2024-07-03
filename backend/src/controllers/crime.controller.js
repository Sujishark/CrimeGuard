const { crimeStatus } = require("../config/crimeStatus");
const { crimeService, crimeTypeService, weaponService, placeService, commentService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status')

const registerCrimeController = catchAsync(async (req, res) => {

    const { success, id } = await crimeService.createCrimeService(req.body);
    if (success) {
        return res.status(httpStatus.CREATED).send({ id })
    }
    return res.status(httpStatus.CONFLICT).send();
});

const fetchAllCrimesController = catchAsync(async (req, res) => {
    filterData = req.query
    console.log(filterData)
    const crimeData = await crimeService.fetchAllCrimesService(filterData);
    crimeData ? res.status(httpStatus.OK).send(crimeData) : res.status(httpStatus.BAD_REQUEST).send();
});

const fetchCrimeController = catchAsync(async (req, res) => {
    const data = await crimeService.fetchCrimeService(req.params.id);
    data ? res.status(httpStatus.OK).send(data) : res.status(httpStatus.BAD_REQUEST).send();
});

const fetchLatestActivityController = catchAsync(async (req, res) => {
    reqData = req.query
    const crimeData = await crimeService.fetchLatestActivitiesService(reqData);
    crimeData ? res.status(httpStatus.OK).send(crimeData) : res.status(httpStatus.BAD_REQUEST).send();
});

const fetchAllActivityController = catchAsync(async (req, res) => {
    const data = await crimeService.fetchActivityForCrimeId(req.params.id);
    data ? res.status(httpStatus.OK).send(data) : res.status(httpStatus.BAD_REQUEST).send();
});

const fetchCrimeTypes = catchAsync(async (req, res) => {
    const data = await crimeTypeService.fetchCrimeTypeService();
    res.status(httpStatus.OK).send(data)
});

const fetchPlaces = catchAsync(async (req, res) => {
    const data = await placeService.fetchPlaceService();
    res.status(httpStatus.OK).send(data)
});

const fetchWeapons = catchAsync(async (req, res) => {
    const data = await weaponService.fetchWeaponService();
    res.status(httpStatus.OK).send(data)
});

const fetchComment = catchAsync(async (req, res) => {
    const data = await commentService.fetchCommentForCrime(req.params.id);
    res.status(httpStatus.OK).send(data)
});
const createCommentController = catchAsync(async (req, res) => {
    const { success, id } = await commentService.createComment(req.body);
    console.log(success, id)
    res.status(httpStatus.CREATED).send({ id })
});
const createActivityController = catchAsync(async (req, res) => {
    const { success } = await crimeService.createCrimeActivityService(req.body)
    if (success) {
        return res.status(httpStatus.CREATED).send()
    }
    return res.status(httpStatus.BAD_REQUEST).send()
});
module.exports = {
    registerCrimeController,
    fetchAllCrimesController,
    fetchCrimeController,
    fetchLatestActivityController,
    fetchAllActivityController,
    fetchCrimeTypes,
    fetchPlaces,
    fetchWeapons,
    fetchComment,
    createCommentController,
    createActivityController
}