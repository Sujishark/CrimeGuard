const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const crimeRoute = require('./crime.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/user',
        route: userRoute,
    },
    {
        path: '/crime',
        route: crimeRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;
