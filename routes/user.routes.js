require("dotenv").config();
const express = require("express");
const userRouter = express.Router();
const axios = require('axios');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const User = require('../models/User.model');


userRouter.get('/user/getinfo', async (req, res)=>{
  const reqUser = req.user
  try{
    let username = reqUser.username;
    let user = await User.findOne({ username: username})
    res.status(200).json({user:user})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message:err.message})
  }
})



module.exports=userRouter;
