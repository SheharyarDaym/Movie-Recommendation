// const { findOne, updateOne } = require("../models/movieModel")
const User = require("../models/userModel")
const mongoose = require("mongoose")

const secretKey = "@#$%^987656#$%8FYTyu@#$8465#$%^GY@#WE$R%TÛYG"


const bcrypt = require("bcrypt");

let signup = async (req, res) => {
    let { username, email, password } = req.body;

    let find = await User.findOne({ email });
    if (find) {
        return res.status(400).send("Email is already registered");
    }
    let hashing = await bcrypt.hash(password, 10);
    let insert = new User({ username, email, password:hashing });
    insert.save().then(()=>{
        return res.status(201).send("Data is inserted successfully");
    }).catch((err)=>{
        console.error("Error inserting data:", err.message);
        return res.status(500).send("Data is not inserted");
    })     
}



let login = async (req,res) => {
    let {email,password} = req.body
    let find = await User.findOne({email})
    if(!find){
        return res.status(400).send("User is not found")
    }
    jwt.sign({userid : User._id}, secretKey, {expiresIn : '500s'} , (err,token)=>{
        if(err){
            return res.status(400).json({error : "Token generation failed"})
        }
        return res.json({
            token
        })
    } )

}

let profile = (req,res) => {
    jwt.verify(req.token,secretKey,(err, authData) => {
        if(err){
           return res.status(400).json({error : "Token verification failed"})
        }
        res.json({success : "Profile is accessed successfully! "})
    })
}



module.exports = {signup,login,profile}

