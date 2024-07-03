const {authService, userService}= require("../services");
const tokenService = require("../services/token.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status')

const registerUserController = catchAsync(async (req, res) => {
    const {success, id} = await authService.createUserService(req.body);
    if(success){
        const userData = await userService.fetchUserService(id);
        const tokens = await tokenService.generateAuthTokens(id);
        return res.status(httpStatus.CREATED).send({user:userData, tokens:tokens})
    }
    return res.status(httpStatus.CONFLICT).send();
});

const loginUserController = catchAsync(async (req, res) => {
    const data = await authService.loginUserService(req.body);
    if (data.userExists){
        const userData = await userService.fetchUserService(data.id);
        const tokens = await tokenService.generateAuthTokens(data.id);
        return res.status(httpStatus.OK).send({user:userData, tokens:tokens})
    }
    return res.status(httpStatus.UNAUTHORIZED).send();
});



module.exports = {
    registerUserController,
    loginUserController
}