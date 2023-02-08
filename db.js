const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017";

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongoose successfully")
//     })
// }

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected to mongoose successfully")
    }).catch((err)=> console.log(err));
};


module.exports = connectToMongo;