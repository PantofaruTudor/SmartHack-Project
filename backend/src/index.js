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

const authRoutes = require('./controllers/auth_controller');
app.use('/',authRoutes)



const port = 5000
const start = async() => {
  try{
    const connectDB = require('./config/connect_database')
    const connection = connectDB(process.env.MONGO_URI)
    const {Items,Users} = require('./models/schema')(connection)

 
    //app.use('/api/auth', authRoutes);
    
    app.listen(port, ()=> {
      console.log(`Server listening on port ${port}`);
      console.log(`Auth API: http://localhost:${port}/api/auth/login`);
    });
  }
  catch(error){
    console.error('Error starting',error.message);
  }
}

start()