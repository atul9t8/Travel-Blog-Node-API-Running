const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/registrationModel");
const bcrypt = require("bcrypt");
const user = require("../models/registrationModel");

const registration = async (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;

    let exist = await User.find({email:email})
    if (exist.length > 0) {
        res.send("An account with this email aready exists")
    }
    else{
        password = req.body.password;
        cPassword = req.body.cPassword;

        if(password === cPassword){
            bcrypt.hash(password, 10, (err, hash)=>{
                password = hash;
                let user = new User({
                    name : name,
                    email : email,
                    password : password
                })
                try {
                    user.save()
                    const token = user.generateJWT()
                    console.log(token)
                } catch (error) {
                    res.send(error)
                }
            });
        }else{
            res.send("Password and Confirm Password doesn't match!")
        }
    }
}


const login = async (req,res)=>{
    email = req.body.email;
    password = req.body.password;

    const user = await User.findOne({email:email})
    if(user !== null){
        const checkPass = await bcrypt.compare(password, user.password)
        if(checkPass == true){
            const token = user.generateJWT()
            console.log(token)
        }else{
            res.send("Invalid email or password")
        }
    }else{
        res.send("Invalid email or password")
    }
}

module.exports = { registration, login }