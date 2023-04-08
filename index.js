const connectToMongo = require('./db');
connectToMongo();
var cors = require('cors') 

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`connected: port: ${port}`)
})

// const start = async ()=> {
//   try{
//     await connectToMongo();
//     app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`)
//     });
//   } catch (error){
//     console.log(error);
//   }
// }