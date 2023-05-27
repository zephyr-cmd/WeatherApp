const express = require('express');
const router = express.Router();

const {createResValidation}=require("./validations/addResValidator");
const {validationResult}=require("./../../utils/responseHandler/errorValidation")

const {getWeather}=require("./controller/controller")

console.log("inside the restaruant routes---->")

// router.post("/",createResValidation,validationResult,addRestaurant)
router.get("/",getWeather)

module.exports = router;