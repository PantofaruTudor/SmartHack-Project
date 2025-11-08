module.exports = (connection) => {
    const mongoose = require('mongoose');

    const ItemSchema = new mongoose.Schema({
        approval: {type: Boolean},
        numberSeats: {type: Number},
        date_of_meet: {type: Date},
        room: {type: String},
    });


    const UserSchema = new mongoose.Schema({
        username: {type: String, required: false, unique: true, sparse: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum: ['user', 'admin'], default: 'user'},
        reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Items'}],
    }, {
        timestamps: true
    });

    return{
        Items: connection.models.Items || connection.model('Items', ItemSchema),
        Users: connection.models.Users || connection.model('Users', UserSchema),
    }
    
}