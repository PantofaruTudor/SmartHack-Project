const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/schema')(require('../config/connect_database')(process.env.MONGO_URI_USER));

const login = async(req,res) => {
    try{
        const {username, password} = req.body
        console.log(username, password)
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).send({message: "Email not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
        {
            return res.status(404).send({message: 'Invalid password'})
        }
        const token = jwt.sign(
            { userId: user._id, userEmail: user.email },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
        );

        res.status(200).send({
            message: 'Login Successful',
            email: user.email,
            token,
        });
    }
    catch(error)
    {
        console.error('Error in login:', error.message);
        res.status(500).send({
            message: 'Error logging in',
            error,
        });
    }
}

module.exports = {login}