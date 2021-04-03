const mongoose = require("mongoose");
const { type } = require("node:os");
const { Schema, model } = mongoose;
const BetTournament = new Schema(
    {
      startDate: {type: Date, required: true},
      endDate: {type: Date, required: true},
      players:[{type: Schema.Types.ObjectId, ref:'User'}],
      invitedPlayers:[{type: Schema.Types.ObjectId, ref:'User'}],

    },
    {
        timestamps: true,
    }
);
module.exports = model("BetTournament", BetTournament);
