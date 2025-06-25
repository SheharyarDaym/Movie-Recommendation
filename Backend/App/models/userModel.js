const mongoose = require("mongoose")

let Schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    favoriteGenre : {
        type : [String],
        default : []
    },
    favoriteActors : {
        type : [String],
        default : []
    },
    likedMovies : {
        type : [String],
        default : []
    }
})


let userModel = mongoose.model("users", Schema)

module.exports = userModel