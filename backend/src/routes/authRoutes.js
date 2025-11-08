const express = require('express');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email și parolă obligatorii' 
      });
    }

    const Users = req.app.locals.Users;
    
    if (!Users) {
      console.error('❌ Users model not found in app.locals');
      return res.status(500).json({ 
        success: false,
        message: 'Eroare server - Models not initialized' 
      });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ 
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Utilizator cu acest email sau username există deja' 
      });
    }

    // Create new user (password not hashed for now - TODO: implement bcrypt)
    const newUser = new Users({
      username: username || email.split('@')[0], // Use email prefix if no username
      email: email,
      password: password // TODO: Hash password with bcrypt
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Cont creat cu succes',
      token: 'temp-token', // TODO: Generate JWT token
      user: { 
        id: newUser._id, 
        username: newUser.username,
        email: newUser.email 
      }
    });

  } catch (error) {
    console.error('❌ Register error:', error.message);
    console.error(error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Eroare server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Username și parolă obligatorii' 
      });
    }

    const Users = req.app.locals.Users;
    
    if (!Users) {
      console.error('❌ Users model not found in app.locals');
      return res.status(500).json({ 
        success: false,
        message: 'Eroare server - Models not initialized' 
      });
    }

    // Try to find user by username or email
    const user = await Users.findOne({ 
      $or: [
        { username: username },
        { email: username }
      ]
    });

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Username sau parolă incorectă' 
      });
    }

    // Compare password (plain text comparison for now - should use bcrypt)
    // TODO: Implement bcrypt comparison
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false,
        message: 'Username sau parolă incorectă' 
      });
    }

    res.json({
      success: true,
      message: 'Login cu succes',
      token: 'temp-token', // TODO: Generate JWT token
      user: { 
        id: user._id, 
        username: user.username,
        email: user.email 
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error.message);
    console.error(error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Eroare server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
