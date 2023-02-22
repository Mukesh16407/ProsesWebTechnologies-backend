const express = require('express');
require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const router = require('./Routes/router');
require('./db/dbConfig')

const app = express();



const cors = require('cors');


const port =process.env.PORT || 6010;

app.use(cors());
app.use(express.json());

app.use("/uploads",express.static("./uploads"));

app.use(router)

app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})