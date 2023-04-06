const mongoose = require('mongoose');
require('dotenv').config()
// const mongoURI = process.env.MONGO_URI

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to mongoose successfully")
    }).catch((err)=> console.log(err));
};


module.exports = connectToMongo;
