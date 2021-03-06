require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

router.get('/casino', async (req, res) => {
  try {
    let username = req.user.username;
    console.log(username);
  } catch (error) {
    console.log('erro', error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get('/casino/blackjack/getplayerchips', async (req, res) => {
  let username = req.user.username;
  try {
    let user = await User.findOne({ username: username });
    let money = user.money;
    let chips = user.money * 100;

    res.status(200).json({ chips: chips });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post('/casino/blackjack/updateplayerchips', async (req, res) => {
  let newChipsAmount = req.body.chips;
  let username = req.user.username;
  console.log(req.body);
  try {
    let user = await User.findOneAndUpdate(
      { username: username },
      { money: newChipsAmount / 100 },{new:true}
    );

    let chips = user.money*100;
    res.status(200).json({ chips: chips });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get('/casino/getlikedgames', async (req, res) => {
  let username = req.user.username;

  try{
    if (!username){
      throw new Error(`Sua sessao expirou`)
    }

    let user = await User.findOne({ username: username});

    let likedGames = user.likedGames;

    res.status(200).json({ likedGames: likedGames})


  }catch(err){
    console.log(err.message)
    res.status(500).json({ message: err.message });
  }


});

router.post('/casino/likegame', async (req, res) => {
  const name = req.body.name;
  const username = req.user.username;
  try {
    if (!username){
      throw new Error('Sua sessao expirou')
  }
    let userBefore = await User.findOne({ username: username})
    let likedGamesBefore = [...userBefore.likedGames];
    likedGamesBefore.push(name)

    let user = await User.findOneAndUpdate({ username: username}, {likedGames:likedGamesBefore}, {new:true})

    res.status(201).json({likedGames: likedGamesBefore})
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message:error.message})
  }
})

module.exports = router;
