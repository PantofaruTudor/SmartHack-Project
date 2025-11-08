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

const port = process.env.PORT || 5000

const start = async() => {
  try{
    // Check if MONGO_URI exists
    if(!process.env.MONGO_URI){
      console.error('❌ MONGO_URI is missing from .env file')
      process.exit(1)
    }

    // Connect to database
    const connectDB = require('./config/connect_database')
    const connection = await connectDB(process.env.MONGO_URI)
    
    // Get models
    const {Items, Users} = require('./models/schema')(connection)
    
    // Store models in app.locals so routes can access them
    app.locals.Items = Items
    app.locals.Users = Users
    
    // Auth routes (must be after models are set)
    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);
    
    // Start server
    app.listen(port, ()=> {
      console.log(`✅ Server listening on port ${port}`);
      console.log(`📍 Auth API: http://localhost:${port}/api/auth/login`);
    });
  }
  catch(error){
    console.error('❌ Error starting server:', error.message);
    console.error(error.stack);
    
    // Don't exit immediately - let user see the error
    // process.exit(1);
    
    // Try to start server anyway (for testing without DB)
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  Starting server without database connection (development mode)');
      app.listen(port, ()=> {
        console.log(`⚠️  Server listening on port ${port} (NO DATABASE)`);
        console.log(`📍 Auth API: http://localhost:${port}/api/auth/login`);
        console.log('⚠️  Database connection failed - API routes will not work');
      });
    } else {
      process.exit(1);
    }
  }
}

start()