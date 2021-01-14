//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) =>{
    const currentYear = new Date().getFullYear();
    res.render("index", {currentYear:currentYear});
})

app.listen(port, () =>{
    console.log("listening on: " + port);
} )