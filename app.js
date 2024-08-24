const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const orderRouter = require('./routes/orderRoutes');
const messageRouter = require('./routes/messageRoutes');
const productRouter = require('./routes/productRoutes');
const registrationRouter = require('./routes/registrationRoutes');
const requestRouter = require('./routes/requestRoutes');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//app.enable('trust proxy');

// Define view engine and path to views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.options('*', cors());
//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security http
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit API request from IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //100 requests in 1 hour (60 mins)
  message: 'Too many requets from this IP, please try again in one (1) hour!',
});

app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

//Data sanitization against noSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/registration', registrationRouter);
app.use('/api/v1/quoterequest', requestRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Your request for ${req.originalUrl} was not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
