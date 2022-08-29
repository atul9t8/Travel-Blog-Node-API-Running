const express = require("express");
const mongoose = require("mongoose")
const app = express();
app.use(express.json())
const userRoute = require("./routes/userRoutes")

require('dotenv').config()
mongoose.connect(process.env.DB)

app.use('/user', userRoute)


port = process.env.PORT || 8088

app.listen(port, ()=> console.log("Listening")) 