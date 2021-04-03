const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const settingsSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: "User"},
        sexo: {type: String, enum:['masculino', 'feminino', 'nao'], default:'nao'},
        profileImgUrl: {type: String},
        theme: {type:String, enum:['dark', 'light'], default:'dark'}
    },
    {
        timestamps: true,
    }
);

module.exports = model("Settings", settingsSchema);