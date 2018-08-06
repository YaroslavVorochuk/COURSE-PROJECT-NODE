const mongoose = require("mongoose");
const express = require("express");
const bodyParcer = require("body-parser");

const app = express();
const itemRoutes = require("./routes/itemRoutes");
mongoose.connect("mongodb://localhost:27017/projectDB");

var db = mongoose.connection;

app.use(bodyParcer.urlencoded({extended: false}));
app.use(bodyParcer.json());
app.use("/items", itemRoutes);

// app.use('/', (req, res) => {
//     "message" : "Default"
// });

app.all((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === "OPTION"){
        res.header('Access-Control-Allow-Methods', 'POST', 'GET');
    };
    next();
})

module.exports = app;