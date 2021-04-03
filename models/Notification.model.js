const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Notification = new Schema(
    {
      betGroup: {type:Schema.Types.ObjectId, ref:'BetGroup'},
      odd: {type: Number, min:0},
      stakeMoney: {type: Number, min:0},
      winPrize: {type: Number, min:0},
      active: {type:Boolean}
    },
    {
        timestamps: true,
    }
);
module.exports = model("Notification", Notification);
