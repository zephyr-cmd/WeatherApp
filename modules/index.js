const express = require("express");
const Router = express.Router();
console.log("inside the routesss--->");
Router.use("/weather",require("./weather"))

module.exports=Router