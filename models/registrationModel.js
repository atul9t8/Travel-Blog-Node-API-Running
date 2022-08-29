const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cPassword:{
        type: String
    },
    role:{
        type: String,
        default: "user"
    },
    profileStatus: {
        type:String,
        default:0
    }
})

registrationSchema.methods.generateJWT = function(){
    const token = jwt.sign({_id: this._id, email: this.email}, process.env.SECRET_KEY)
    return token;
}

const user = mongoose.model("User", registrationSchema)
module.exports = user;