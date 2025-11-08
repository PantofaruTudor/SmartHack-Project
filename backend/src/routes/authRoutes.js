const express = require('express');
const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email și parolă obligatorii' 
      });
    }

    const Users = req.app.locals.Users;
    const user = await Users.findOne({ email: username });

    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false,
        message: 'Email sau parolă incorectă' 
      });
    }

    res.json({
      success: true,
      message: 'Login cu succes',
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Eroare server' });
  }
});

module.exports = router;
