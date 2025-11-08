module.exports = (connection) => {
    const mongoose = require('mongoose');

    const ItemSchema = new mongoose.Schema({
        approval: {type: Boolean},
        numberSeats: {type: Number},
        date_of_meet: {type: Date},
        room: {type: String},
    });

    const UserSchema = new mongoose.Schema({
        email: {type: String, require: true, unique: true},
        password: {type: String, required: true},
        
    });

    return{
        Items: connection.models.Items || connection.model('Items', ItemSchema),
        Users: connection.models.Users || connection.model('Users', UserSchema),
    }
    
}