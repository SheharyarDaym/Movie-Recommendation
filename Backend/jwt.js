const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json()); 

const secretKey = "qwertyuiop"

app.post("/",(req,res)=>{
    res.json({message : "This is message"})
})

app.post("/login", (req,res)=>{
    const user = {
        username : "Shehayrar",
        password : "123hgsvdjh"
    }
    jwt.sign({user}, secretKey, {expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })
    })
})


// Middleware
const verifyToken = (req,res,next) => {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    }
    else{
        res.send("Token is invalid")
    }
}

app.post("/profile", verifyToken, (req,res) => {
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.json({
                "Error" : "err"
            })
        }
        else{
            res.json({
                "Successful" : "Profile is accessed successfully!"
            })
        }
    })

})





app.listen(5000)