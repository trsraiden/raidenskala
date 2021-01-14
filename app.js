//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) =>{
    const currentYear = new Date().getFullYear();
    res.render("index", {currentYear:currentYear});
})

app.listen(4000, () =>{
    console.log("listening on 3000");
} )