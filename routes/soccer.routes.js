require("dotenv").config();
const express = require("express");
const soccerRouter = express.Router();
const axios = require("axios");
const User = require("../models/User.model");
const getNextNDates = require("../util/routes_util/getNextNDates");
const makeReqByUrl = require("../util/routes_util/makeReqByUrl");

soccerRouter.get("/soccer/odds/today/:page", async (req, res) => {
  const { page } = req.params;
  try {
    const today = new Date();
    var tomorroww = new Date(today);
    tomorroww.setDate(tomorroww.getDate() + 1);
    let tomorrow = tomorroww.toISOString().split("T")[0];
    let url = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${tomorrow}&timezone=America/Bahia`;

    let req = await makeReqByUrl(url, page);

    let matchesArray = [];
    matchesArray.push(req.response);
    res.status(200).json({ matches: matchesArray, pages: req.paging.total });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

soccerRouter.get("/soccer/odds/date/:date/:page", async (req, res) => {
  const { date, page } = req.params;
  try {
    let url = `https://api-football-v1.p.rapidapi.com/v3/odds/?date=${date}&timezone=America/Bahia`;

    let req = await makeReqByUrl(url, page);

    let matchesArray = [];
    matchesArray.push(req.response);
    
    res.status(200).json({ matches: matchesArray, pages: req.paging.total });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

soccerRouter.get("/soccer/fixture/:fixtureId", async (req, res) => {
  const { fixtureId } = req.params;
  try {
    let url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/?id=${fixtureId}&timezone=America/Bahia`;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

soccerRouter.get("/soccer/leagues/current", async (req, res) => {
  try {
    let url = `https://api-football-v1.p.rapidapi.com/v3/leagues/?current=true`;

    let req = await axios.get(url, {
      headers: {
        "x-rapidapi-key": `${process.env.SOCCER_API_KEY}`,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        useQueryString: true,
      },
    });

    res.status(200).json({ leagues: req.data.response });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

soccerRouter.get("/soccer/leagues/bycountry/:country", async (req, res) => {
  const { country } = req.params;
  try {
    let url = `https://api-football-v1.p.rapidapi.com/v3/leagues/?country=${country}&current=true`;

    let req = await axios.get(url, {
      headers: {
        "x-rapidapi-key": `${process.env.SOCCER_API_KEY}`,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        useQueryString: true,
      },
    });

    let leaguesArray = [];

    req.data.response.forEach((league, index) => {
      if (league.seasons[0].coverage.odds == true) {
        leaguesArray.push(league);
      }
    });

    res.status(200).json({ leagues: leaguesArray });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

soccerRouter.get("/soccer/fixture/byleague/:leagueId", async (req, res) => {
  const { leagueId } = req.params;
  try {
    const todayy = new Date();
    var todayyy = new Date(todayy);
    todayyy.setDate(todayyy.getDate());
    let today = todayyy.toISOString().split("T")[0];

    let next2 = getNextNDates(2)[1]


    let url1 = `https://api-football-v1.p.rapidapi.com/v3/fixtures/?league=${leagueId}&season=${2021}&timezone=America/Bahia&from=${today}&to=${next2}`;
    let url2 = `https://api-football-v1.p.rapidapi.com/v3/fixtures/?league=${leagueId}&season=${2020}&timezone=America/Bahia&from=${today}&to=${next2}`;

    let req = await axios.get(url1, {
      headers: {
        "x-rapidapi-key": `${process.env.SOCCER_API_KEY}`,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        useQueryString: true,
      },
    });

    if (req.status === 200) {
      res.status(200).json({ leagues: req.data.response });
    } else {
      let req2 = await axios.get(url2, {
        headers: {
          "x-rapidapi-key": `${process.env.SOCCER_API_KEY}`,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          useQueryString: true,
        },
      });
      res.status(200).json({ fixtures: req2.data.response });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = soccerRouter;
