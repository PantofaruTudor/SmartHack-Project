const express = require('express');
const router = express.Router();


const Booking = require('../models/Booking'); 

const getBookingModel = (req) => req.app.locals.Bookings;


router.get('/user/:userId', async (req, res) => {
    
    const userId = req.params.userId;
    
    try {
        const Bookings = getBookingModel(req); // Folosește modelul tău real (sau Booking)

        if (!Bookings) {
            console.error('Booking model not found in app.locals');
            return res.status(500).json({ 
                success: false,
                message: 'Eroare server - Modelele nu au fost inițializate' 
            });
        }
        
        // Căutăm rezervările pentru userId-ul specific
        // NOTA: userId-ul pe care îl trimiți din frontend este un string
        const userBookings = await Bookings.find({ userId: userId });

        if (!userBookings || userBookings.length === 0) {
            // Returnează un array gol dacă nu sunt rezervări
            return res.status(200).json([]); 
        }

        res.json(userBookings);

    } catch (error) {
        console.error('❌ Get Bookings error:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Eroare server la preluarea rezervărilor'
        });
    }
});

module.exports = router;