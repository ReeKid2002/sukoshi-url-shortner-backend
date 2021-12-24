require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const url = require("./config/config");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use("/", require("./routes/get-short-url"));
app.use("/", require("./routes/reditect-short-url"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.listen(PORT, function(){
    console.log(`Server is Running at PORT ${PORT}`);
})
