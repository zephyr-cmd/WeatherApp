const express = require("express");
var http = require('http');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const hpp = require("hpp");



// const userRouter = require('./routers/userRouter');
// const authRoutes = require('./routers/authRoutes');

// const globalErrorHandler = require('./middlewares/globalErrorHandler');

// const AppError = require('./utils/appError');

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))

app.use(express.json());

console.log(process.env.NODE_ENV);

// set security http headers
// app.use(helmet());
console.log("L-43,,,,,,,,,,")

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// $ CORS
app.use(cors());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 100, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message: " Too many req from this IP , please Try  again in an Hour ! ",
});

// app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
// app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSql query injection
// app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
// app.use(xss()); //    protect from molision code coming from html

// testing middleware
// app.use((req, res, next) => {
//   console.log("this is a middleware");
//   next();
// });

// routes
// require("./modules");

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use("/api/v1/modules", require("./modules"));
// handling all (get,post,update,delete.....) unhandled routes
// app.all('*', (req, res, next) => {
//   next(
//     new AppError(`Can't find ${req.originalUrl} on the server`, 404)
//   );
// });

// error handling middleware
// app.use(globalErrorHandler);
// const io = require('socket.io')(); //<------
// require('./socket')(io)  
module.exports = {app};
