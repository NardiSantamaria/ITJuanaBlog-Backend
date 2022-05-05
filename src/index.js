const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postsroutes')
require('dotenv').config();
const mongoose= require("mongoose");
const app = express();

app.use(express.json());
app.use(postRoutes);
app.use(cors({ credentials: true }));
//middleware
app.use((error, req, res , next)=>{
   // console.error(error.stack);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS', 'DELETE', 'Content-Type');
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    //res.status(500).json({message: "problemas in middleware"})
});

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