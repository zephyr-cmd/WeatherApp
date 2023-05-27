const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("./../../../utils/responseHandler/response");
const { getWeatherSer } = require("../services/apiServices");

const getWeather = async (req, res) => {
  try {
    console.log("inside the restaurant controller--->");
    const data = await getWeatherSer(req);
    return sendSuccessResponse(res, data);
  } catch (err) {
    console.log("inside the addRestaurantSer Error--->", err.message);
    return sendErrorResponse(res, err);
  }
};

module.exports = { getWeather };