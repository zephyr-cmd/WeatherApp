const app=require("./../app")
var io = require('socket.io')(app);
module.exports=io;