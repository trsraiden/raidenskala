//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch(error => console.log('Could not connect: ' + error));
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established.");
})

const Message = require('./models/message.model.js')

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) =>{
    const currentYear = new Date().getFullYear();
    const sentStatus = "an engineer who is passionate about using technology to improve security and efficiency."
    res.render("index", {currentYear:currentYear, sentStatus:sentStatus});
})

app.post("/messageSent", (req,res) =>{
    const currentYear = new Date().getFullYear();
    const name = req.body.name
    const email = req.body.email;
    const message = req.body.message;
    const success = "Thanks for reaching out! If you provided a valid email address I'll get back to you as soon as I can."
    const fail = "Unfortunately your message couldn't be sent. Feel free to try again later, or message me on LinkedIn."

    const newMessage = new Message({
        name,
        email,
        message
    });

    newMessage.save()
    .then(()=>res.render("index", {currentYear:currentYear, sentStatus:success}))
    .catch(() => res.render("index", {currentYear:currentYear, sentStatus:fail}));
})

app.listen(port, () =>{
    console.log("listening on: " + port);
} )