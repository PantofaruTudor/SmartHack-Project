require('dotenv').config()  // ← Added ()
const express = require('express')  // ← Moved before using it
const app = express()


const port = 3000
const start = async() => {
  try{
    const connectDB = require('./config/connect_database')  // ← Fixed path
    const connection = connectDB(process.env.MONGO_URI)  // ← Renamed variable
    const {Items,Users} = require('./models/schema')(connection)

    
    app.listen(port, ()=> console.log(`Server is listening to port ${port}`))
  }
  catch(error){
    console.error('Error starting',error.message);
  }
}

start()