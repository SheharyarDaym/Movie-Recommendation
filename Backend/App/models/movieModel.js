const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    genres : {
        type : [String],   // 
        required : true
    },
    actors : {
        type : [String],
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

let movieModel = mongoose.model("movies",Schema)

module.exports = movieModel