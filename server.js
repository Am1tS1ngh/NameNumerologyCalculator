const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/numerologyData");

app.set("view engine", "ejs");
// importing all routing files
const calculate = require("./routs/calculate"); 
app.use(express.json());




app.listen(8000, (err) => {
    if(err) console.log(err);
    console.log("running successfully at 8000");
});

app.use(calculate);
