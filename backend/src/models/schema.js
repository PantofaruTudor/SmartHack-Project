module.exports = (connection) => {
    const mongoose = require('mongoose');

    const SeatSchema=new mongoose.Schema({
        unitId:{type:mongoose.Schema.Types.ObjectId,ref:'Units',required:true},
        number:{type:Number,required:true},
        available:{type:Boolean,default:true}
    })

    const ZoneSchema=new mongoose.Schema({
        name:{type:String,required:true}, // ex: 'Offices'
        seats:{type:Number, required:true},
        type:{
            type:String,
            enum:['full','individual'],
            required: true
        }
    })

    const UnitSchema=new mongoose.Schema({
        zoneId:{type:mongoose.Schema.Types.ObjectId,ref:'Zones',required:true},
        capacity:{type:Number}, // nr. total locuri

    })

    const UserSchema=new mongoose.Schema({
        username:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        role:{type:String,enum:['user','admin'],default:'user'}
        
    })

    const BookingSchema=new mongoose.Schema({
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true},
        seatId:{type:mongoose.Schema.Types.ObjectId,ref:'Seats',required:true},
        date:{type:Date,required:true},
        status:{type:String,enum:['pending','approved','rejected'],default:'pending'}
    })


    return{
    Zones:connection.models.Zones||connection.model('Zones',ZoneSchema),
    Units:connection.models.Units||connection.model('Units',UnitSchema),
    Seats:connection.models.Seats||connection.model('Seats',SeatSchema),
    Bookings:connection.models.Bookings||connection.model('Bookings',BookingSchema),
    Users:connection.models.Users||connection.model('Users',UserSchema), 
    };
    
}