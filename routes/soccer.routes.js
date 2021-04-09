require("dotenv").config();
const express = require("express");
const soccerRouter = express.Router();
const axios = require("axios");
const User = require("../models/User.model");
const getNextNDates = require('../util/routes_util/getNextNDates')
const makeReqByUrl = require('../util/routes_util/makeReqByUrl')

soccerRouter.get("/soccer/odds/today/:page", async (req, res) => {
  const {page} = req.params;
  try {
    const today = new Date()
    var tomorroww = new Date(today)
    tomorroww.setDate(tomorroww.getDate()+1)
    let tomorrow = tomorroww.toISOString().split('T')[0]
    let url = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${tomorrow}&timezone=America/Bahia`;
    
    let req = await makeReqByUrl(url,page)

    let matchesArray=[]
    matchesArray.push(req.response)
    res.status(200).json({matches: matchesArray,pages:req.paging.total})


  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

soccerRouter.get("/soccer/odds/date/:date/:page", async (req, res) => {
  const {date,page} = req.params;
  try {
    
    let url = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date}&timezone=America/Bahia`;
    
    let req = await makeReqByUrl(url,page)

    let matchesArray=[]
    matchesArray.push(req.response)
    res.status(200).json({matches: matchesArray,pages:req.paging.total})


  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});








module.exports = soccerRouter;
