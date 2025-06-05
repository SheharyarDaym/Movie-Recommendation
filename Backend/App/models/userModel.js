const mongoose = require("mongoose")

let Schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

})


let userModel = mongoose.model("users", Schema)

module.exports = userModel