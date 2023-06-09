const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: './config.env' });
const colors = require('colors');

// const DBConnect = require('./utils/dbConnect');
process.on('uncaughtException', (error) => {
  // using uncaughtException event
  console.log(' uncaught Exception => shutting down..... ');
  console.log(error.name, error.message);
  process.exit(1); //  emidiatly exists all from all the requests
});

const {app,io} = require('./app');
// var server = http.createServer(app);
// Pass a http.Server instance to the listen method
// var io = require('socket.io').listen(app);
// database connection
// DBConnect();
console.log("process.env.NODE_ENV",process.env.NODE_ENV)
// server
const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});


// io.attach(server); 

// handle Globaly  the unhandle Rejection Error which is  outside the express
// e.g database connection
process.on('unhandledRejection', (error) => {
  // it uses unhandledRejection event
  // using unhandledRejection event
  console.log(' Unhandled Rejection => shutting down..... ');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1); //  emidiatly exists all from all the requests sending OR pending
  });
});
