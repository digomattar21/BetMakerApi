const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, `Insira seu nome de usuário`],
      unique: true,
      trim: true,
      match: [/^[a-zA-Z0-9_-]{3,15}$/, 'Seu username não pode conter símbolos, nem espaços, nem letras maiúsculas e deve ter entre 3 e 15 caracteres!']
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, `Insira um email`],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor insira um email válido"],
    },
    password: { type: String, required: [true, `Insira uma Senha`] },
    settings : {type: Schema.Types.ObjectId, ref: "Settings"},
    confirmationCode: {type: String, unique:true},
    status: {
      type:String,
      enum:['Pending', 'Active'],
      default:'Pending'
    },
    money: {
      type: Number,
      default: 10,
      min: 0
    },
    betGroups: [{type: Schema.Types.ObjectId, ref:"BetGroup"}],
    activeBets: [{type: Schema.Types.ObjectId, ref:"Bet"}],
    completedBets: [{type: Schema.Types.ObjectId, ref:"Bet"}],
    likedGames: [{type:String}]
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
