require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcționează!' });
});

app.get('/api/test', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const port = 5000
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