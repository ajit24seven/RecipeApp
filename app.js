const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");




const fileUpload = require("./server/upload/upload");
const users = require("./server/user/user.route");
const recipes = require("./server/recipe/recipe.route");

//Database Connection
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
    console.log("connected to the database " + config.database)
});

mongoose.connection.on("error", (err) => {
    console.log("connected err " + err)
});


//Express initiated
const app = express();



//Port Number
const port = 3000;

//Cors Middleware
app.use(cors());

//Set Static Folder
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "public")));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users", users);
app.use("/recipe", recipes);
app.use("/upload", fileUpload);






//Index Route
app.get("/",(req, res) => {
    res.send("d")
});
//All Route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//Start Server
app.listen(port, () =>{
    console.log("listening port no " + port);
});