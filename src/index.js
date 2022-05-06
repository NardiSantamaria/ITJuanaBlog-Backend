const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postsroutes')
require('dotenv').config();
const mongoose= require("mongoose");
const app = express();
const { append } = require("express/lib/response");

app.use(express.json());
app.use(cors());
//middleware
app.use((error, req, res , next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
    //res.status(500).json({message: "problemas in middleware"})
});

app.use(postRoutes);
const connectDB=()=> {
    try{
        mongoose.connect(process.env.DB_URI);
        console.log("Database connected");
    } catch(error){
        console.log(error);
    }
}
app.listen(process.env.PORT, ()=> {
    connectDB();
    console.log('Server is running');
});

module.exports = app;