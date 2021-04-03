require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    let url = `https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.ODDS_API_KEY}&sport=soccer_epl&region=uk&mkt=h2h`;
    let response = await axios.get(url);
    res.send(response.data.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/sports', async (req, res) => {
  try {
    let url = `https://api.the-odds-api.com/v3/sports/?apiKey=${process.env.ODDS_API_KEY}`;
    let sportsResponse = await axios.get(url);
    res.send(sportsResponse.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/events/inplay', async (req, res) => {
  try {
    let url = `https://betsapi2.p.rapidapi.com/v1/bet365/inplay`;
    let request = await axios.get(url, {
      headers: {
        'x-rapidapi-key': 'e0064e12c9msh60106f11e6d8f46p14ec02jsnb73563a54d60',
        'x-rapidapi-host': 'betsapi2.p.rapidapi.com',
        useQueryString: true,
      },
    });
    //console.log(request.data.results)
    let array = []
    request.data.results.map(i =>{
      console.log(i.NA)
    })
    console.log('array',array)
    res.status(201).json(request.data)
  } catch (error) {
    console.log(error.message);
  }
});


router.get('/sports/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let url = `https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.ODDS_API_KEY}&sport=${id}&region=uk&mkt=h2h`;
    let request = await axios.get(url);
    res.send(request.data.data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/test', async (req, res) => {
  try {
    let url = 'https://betsapi2.p.rapidapi.com/v1/bet365/event?FI=100630065';
    let request = await axios.get(url, {
      headers: {
        'x-rapidapi-key': 'e0064e12c9msh60106f11e6d8f46p14ec02jsnb73563a54d60',
        'x-rapidapi-host': 'betsapi2.p.rapidapi.com',
        useQueryString: true,
      },
      query:{
        "FI": '100630065'
      }
    });
    console.log(request.data);
    res.status(201).json(request.data)
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
