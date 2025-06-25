const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())


const movieRoutes = require('./App/routes/movieRoute');
const userRoutes = require('./App/routes/userRoute')


app.use('/movies', movieRoutes)
app.use('/user', userRoutes)




mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Database connected")
    app.listen(process.env.PORT)
}).catch((e)=>{
    console.log(e)
})