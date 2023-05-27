const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const axios = require("axios");
const io = require("./../../../utils/socket");
const socket = require("../../../socket");
// const RestaurantsModel=require("../../../model/restaurant");

// const addRestaurantSer=async(req)=>{
const getWeatherSer = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log("changes----->")
            let counter = 0;
            let { data } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m `
            );
            console.log("result----->", data.hourly)
            const temp_data = data.hourly;
            let time = [];
            let relativehumidity_2m = [];
            let temperature_2m = [];
            setInterval(() => {
                //lop
                for (let count = counter; count < counter + 10; count++) {
                    time.push(temp_data.time[count]);

                }
                for (let count = counter; count < counter + 10; count++) {
                    relativehumidity_2m.push(temp_data.relativehumidity_2m[count]);

                }
                for (let count = counter; count < counter + 10; count++) {
                    temperature_2m.push(temp_data.temperature_2m[count]);

                }
                counter = counter + 10;
                console.log("socket connected");
                //   socket.emit("connected",data={
                //     one:"one"
                //   })
                io.on("connection", (socket) => {
                    console.log("socket connected------>");
                    socket.emit("weather_emitted", data= {
                        time: time,
                        relativehumidity_2m: relativehumidity_2m,
                        temperature_2m: temperature_2m
                    });
                });


            }, 10000)
            return resolve({
                status: 200,
                message: "Successfully fetch weather",
                data: data
            })
        } catch (err) {
            console.log("error--->", err);
            return reject({
                status: 503,
                message: err.message,
                data: err
            })
        }
    })
}

module.exports = { getWeatherSer }