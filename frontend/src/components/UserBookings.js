import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { set } from 'mongoose';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);

            try {
                const userString = localStorage.getItem('user');
                if(!userString){
                    setError('User not logged in');
                    return;
                }
                const userObj = JSON.parse(userString);
                const userId = userObj.id;

                if(!userId){
                    setError('Invalid user id: id not found');
                    return;
                }

                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            });

                setBookings(response.data);
        } catch (err) {
                console.error('Error fetching bookings:', err.response ? err.response.data : err.message);
                setError('Failed to fetch bookings');
    } finally {
        setLoading(false);
    }

};
        fetchBookings();
    }, []);
    if (loading) {return <p>Loading active reservations...</p>;}
    if (error) {return <p className="error-message">{error}</p>;}
    if (bookings.length === 0) {return <p>No active reservations found. Make the first one!</p>;}

    return (
        <div className = 'bookings-list-container'>
            {bookings.map((booking) => (
                <div key = {booking.id} className="booking-item-card">
                    <h3>Location: {booking.resourceName || booking.resourceId}</h3>
                    <p>Day: {new Date(booking.date).toLocaleDateString()}</p>
                    <p>Timelapse: {booking.startTime} - {booking.endTime}</p>
                </div>
            ))}
        </div>
    );
};

export default UserBookings;
