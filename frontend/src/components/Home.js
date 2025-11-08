import React, {useState, useEffect} from 'react';
import './Home.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Map from './Map';
// import UserBookings from './UserBookings';

const Home = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('menu');
    const [username, setUsername] = useState('User');

    useEffect(() => {
        const userString = JSON.parse(localStorage.getItem('user'));
        if (userString){
            try{
                const userObj = JSON.parse (userString);
                const nameToDisplay = userObj.username || userObj.email?.split('@')[0] || 'User';
                setUsername(nameToDisplay);
            } catch (e) {
                console.error('Error at parsing user from localStorage', e);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
}

const renderContent = () => {
    switch (currentView) {
      case 'map':
        return (
          <div className="view-container">
             <button className="back-btn" onClick={() => setCurrentView('menu')}>
               Back to Menu
             </button>
             <h2>Choose a zone!</h2>
             {/* Aici se afișează harta interactivă */}
             <Map />
          </div>
        );
      case 'bookings':
        return (
          <div className="view-container">
            <button className="back-btn" onClick={() => setCurrentView('menu')}>
              Back to Menu
            </button>
            <h2>Your bookings</h2>
            <p>Still working!...</p>
            {/* <UserBookings />  <-- Decomentează când e gata componenta */}
          </div>
        );
      default: // Cazul 'menu' (pagina principală de Home)
        return (
          <div className="menu-container">
            <h1>Hello, <span className="username-highlight">{username}</span>!</h1>
            <p className="subtitle">What do you want to do?</p>
            
            <div className="action-buttons">
              {/* Button 1: Go to Map */}
              <div className="action-card" onClick={() => setCurrentView('map')}>
                <div className="icon"></div>
                <h3>Make a new booking</h3>
                <p>View the interactive map and choose your spot.</p>
              </div>

              {/* Button 2: Go to Your Bookings */}
              <div className="action-card" onClick={() => setCurrentView('bookings')}>
                <div className="icon"></div>
                <h3>See your bookings</h3>
                <p>Check or cancel your active bookings.</p>
              </div>
            </div>
          </div>
        );
    }
  };

return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Molson Coors</div>
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </header>
      
      <main className="home-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default Home;