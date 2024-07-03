const express = require('express');
const httpStatus = require('http-status')
const mysql = require('mysql2');
const cors = require('cors')
const passport = require('passport');
const connect = require('./config/sql');
const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');
const { jwtStrategy } = require('./config/passport');

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/v1', routes);

// jwt authentication 
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.get('/', function (req, res) {
  res.send({ "alive": "true" });
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


const startServer = () => {
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });

}
const checkAndStart = async () => {
  console.log(connection)
  if (connection) {
    startServer();
  } else {
    setTimeout(() => checkAndStart(), 2000); // Retry after 1 second
  }
};

startServer();
