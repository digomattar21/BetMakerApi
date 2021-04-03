const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const BetGroup = new Schema(
    {
        bets:[{type: Schema.Types.ObjectId, ref:"Bet", required: true}],
        stakeMoney: {type: Number, min:0, required: true},
        winPrize: {type: Number, min:0, required: true},
        totalOdds: {type: Number, min:0, required: true}
    },
    {
        timestamps: true,
    }
);
module.exports = model("BetGroup", BetGroup);
