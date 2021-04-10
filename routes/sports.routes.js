require("dotenv").config();
const express = require("express");
const sportsRouter = express.Router();
const axios = require("axios");
const User = require("../models/User.model");
const getNextNDates = require("../util/routes_util/getNextNDates");
const makeReqByUrl = require("../util/routes_util/makeReqByUrl");


sportsRouter.get('/sports/get/all', async (req, res) => {

    try {
        let url = "https://therundown-therundown-v1.p.rapidapi.com/sports";

        let req = await axios.get(url, {
            headers:{
                "x-rapidapi-key": `${process.env.THE_RUNDOWN_API_KEY}`,
	            "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
	            "useQueryString": false
            }
        });

        console.log(req.data)

        res.status(200).json({sports:req.data})


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});


sportsRouter.get('/sports/get/sport/today/:sportId', async (req, res) => {
    const { sportId } = req.params;

    try {
        const todayyy = new Date();
        var todayy = new Date(todayyy);
        todayy.setDate(todayy.getDate());
        let today = todayy.toISOString().split("T")[0];
        console.log(today)

        let url = `https://therundown-therundown-v1.p.rapidapi.com/sports/${sportId}/events/${today}`

        let req = await axios.get(url, {
            headers:{
                "x-rapidapi-key": `${process.env.THE_RUNDOWN_API_KEY}`,
	            "x-rapidapi-host": "therundown-therundown-v1.p.rapidapi.com",
	            "useQueryString": true
            }
        });

        console.log(req.data)

        res.status(200).json({matches:req.data})


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});





module.exports = sportsRouter;