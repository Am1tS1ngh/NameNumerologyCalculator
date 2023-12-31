const mongoose = require("mongoose")

const destinyDescSchema = mongoose.Schema({
    resultKey: {
        type: Number,
        unique: true
    },
    content: String
})

const heartDescSchema = mongoose.Schema({
    resultKey: {
        type: Number,
        unique: true
    },
    content: String
})

const dreamDescSchema = mongoose.Schema({
    resultKey: {
        type: Number,
        unique: true
    },
    content: String
})

const DestinyModel = mongoose.model("destiny", destinyDescSchema);
const HeartModel = mongoose.model("heart", heartDescSchema);
const DreamModel = mongoose.model("dream", dreamDescSchema);

module.exports = {
    DestinyModel,
    HeartModel,
    DreamModel,
}