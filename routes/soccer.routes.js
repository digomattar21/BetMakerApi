require("dotenv").config();
const express = require("express");
const soccerRouter = express.Router();
const axios = require("axios");
const User = require("../models/User.model");

soccerRouter.get("/soccer/odds/today", async (req, res) => {
  try {
    let today = new Date();
    today = today.toISOString().split("T")[0];
    console.log('todays date: ', today)
    let url = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${today}`;
    let req = await axios.get(url, {
      headers: {
        "x-rapidapi-key": "f974ebfb2fmsh58c9d9268e1cfb0p14b20djsnf261ee8b582b",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        useQueryString: true,
      }
    });
    console.log(req.data.response)
    res.status(200).json({matches: req.data.response})


  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = soccerRouter;
