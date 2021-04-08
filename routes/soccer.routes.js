require("dotenv").config();
const express = require("express");
const soccerRouter = express.Router();
const axios = require("axios");
const User = require("../models/User.model");
const getNextNDates = require('../util/getNextNDates')
const makeReqByUrl = require('../util/makeReqByUrl')

soccerRouter.get("/soccer/odds/today", async (req, res) => {
  try {
    const today = new Date()
    var tomorroww = new Date(today)
    tomorroww.setDate(tomorroww.getDate()+1)
    let tomorrow = tomorroww.toISOString().split('T')[0]
    let url = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${tomorrow}&timezone=America/Bahia`;
    let req = await axios.get(url, {
      headers: {
        "x-rapidapi-key": `${process.env.SOCCER_API_KEY}`,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        useQueryString: true,
      }
    });
    console.log(req.data.response)
    res.status(200).json({matches: req.data.response, tomorrow: tomorrow})


  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});


soccerRouter.get('/soccer/odds/next3', async (req, res) => {

  try {
    let [date1,date2,date3] = getNextNDates(3)
    let url1 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date1}&timezone=America/Bahia`;
    let url2 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date2}&timezone=America/Bahia`;
    let url3 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date3}&timezone=America/Bahia`;


    let req1 = await makeReqByUrl(url1);
    let req2 = await makeReqByUrl(url2);
    let req3 = await makeReqByUrl(url3);
    
    let matchesArray = [];
    matchesArray.push(req1.response)
    matchesArray.push(req2.response)
    matchesArray.push(req3.response)

    res.status(200).json({matches: matchesArray})

    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }


});

soccerRouter.get('/soccer/odds/week', async (req, res) => {

  try {
    let [date1,date2,date3,date4,date5,date6,date7] = getNextNDates(7)
    let url1 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date1}&timezone=America/Bahia`;
    let url2 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date2}&timezone=America/Bahia`;
    let url3 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date3}&timezone=America/Bahia`;
    let url4 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date4}&timezone=America/Bahia`;
    let url5 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date5}&timezone=America/Bahia`;
    let url6 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date6}&timezone=America/Bahia`;
    let url7 = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date7}&timezone=America/Bahia`;

    let req1 = await makeReqByUrl(url1);
    let req2 = await makeReqByUrl(url2);
    let req3 = await makeReqByUrl(url3);
    let req4 = await makeReqByUrl(url4);
    let req5 = await makeReqByUrl(url5);
    let req6 = await makeReqByUrl(url6);
    let req7 = await makeReqByUrl(url7);

    
    let matchesArray = [];
    matchesArray.push(req1.response)
    matchesArray.push(req2.response)
    matchesArray.push(req3.response)
    matchesArray.push(req4.response)
    matchesArray.push(req5.response)
    matchesArray.push(req6.response)
    matchesArray.push(req7.response)

    res.status(200).json({matches: matchesArray})

    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }


});





module.exports = soccerRouter;
