const express = require('express');

require('dotenv').config();

const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require('./db/dbConfig')

const cors = require('cors');

const port =process.env.PORT || 6010;

app.use(cors());
app.use(express.json());




app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})