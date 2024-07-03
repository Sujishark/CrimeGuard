const {userService, notificationService}= require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status')


const fetchAllUsers = catchAsync(async (req, res) => {
    const userData = await userService.fetchAllUsersService();
    userData ? res.status(httpStatus.OK).send(userData) : res.status(httpStatus.NOT_FOUND).send();
});

const fetchUserController = catchAsync(async (req, res) => {
    const userData = await userService.fetchUserService(req.params.userId);
    userData ? res.status(httpStatus.OK).send(userData) : res.status(httpStatus.NOT_FOUND).send();
});


const deleteUserController = catchAsync(async (req, res) => {
    const status = await userService.deleteUserService(req.params.userId);
    status ? res.status(httpStatus.CREATED).send(true) : res.status(httpStatus.CONFLICT).send();
});

const updateUserDetailsController = catchAsync(async (req, res) => {
    const status = await userService.updateUserService(req.body, req.params.userId);
    if(status){
        let data = await userService.fetchUserService(req.params.userId);
        return res.status(httpStatus.CREATED).send(data)
    }
    return res.status(httpStatus.CONFLICT).send(user);
});

const fetchAllNotificatiosController = catchAsync(async (req, res) => {
    const data = await notificationService.fetchNotificationForUser(req.params.userId);
    res.status(httpStatus.OK).send(data);
});

const fetchLatestNotificationController = catchAsync(async (req,res) => {
    const status = await notificationService.fetchLatestNotification(req.params.userId, req.params.crimeId);
    if(status){
        let data = await notificationService.fetchLatestNotification(req.params.userId, req.params.crimeId);
        return res.status(httpStatus.OK).send(data)
    }
    return res.status(httpStatus.BAD_REQUEST).send();
});

const deleteUserSubscriptionController = catchAsync(async (req,res) => {
    const status = await notificationService.deleteUserSubscription(req.params.userId, req.params.crimeId);
    status ? res.status(httpStatus.NO_CONTENT).send() : res.status(httpStatus.BAD_REQUEST).send();
})
const addUserSubscriptionController = catchAsync(async (req,res) => {
    const status = await notificationService.addUserSubscription(req.params.userId, req.params.crimeId);
    status ? res.status(httpStatus.CREATED).send() : res.status(httpStatus.BAD_REQUEST).send();
})

module.exports={
    deleteUserController,
    updateUserDetailsController,
    fetchUserController,
    fetchAllUsers,
    fetchAllNotificatiosController,
    fetchLatestNotificationController,
    addUserSubscriptionController,
    deleteUserSubscriptionController
}