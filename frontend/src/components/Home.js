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
               ⬅ Înapoi la Meniu
             </button>
             <h2>Rezervă un Birou 🗺️</h2>
             {/* Aici se afișează harta interactivă */}
             <Map />
          </div>
        );
      case 'bookings':
        return (
          <div className="view-container">
            <button className="back-btn" onClick={() => setCurrentView('menu')}>
              ⬅ Înapoi la Meniu
            </button>
            <h2>Rezervările Tale 📅</h2>
            <p>Funcționalitate în lucru... Aici vei vedea lista ta de rezervări.</p>
            {/* <UserBookings />  <-- Decomentează când e gata componenta */}
          </div>
        );
      default: // Cazul 'menu' (pagina principală de Home)
        return (
          <div className="menu-container">
            <h1>Salut, <span className="username-highlight">{username}</span>! 👋</h1>
            <p className="subtitle">Ce dorești să faci astăzi?</p>
            
            <div className="action-buttons">
              {/* Buton 1: Mergi la Hartă */}
              <div className="action-card" onClick={() => setCurrentView('map')}>
                <div className="icon">🗺️</div>
                <h3>Fă o Rezervare Nouă</h3>
                <p>Vezi harta interactivă a biroului și alege-ți locul.</p>
              </div>

              {/* Buton 2: Mergi la Rezervările mele */}
              <div className="action-card" onClick={() => setCurrentView('bookings')}>
                <div className="icon">📅</div>
                <h3>Vezi Rezervările Tale</h3>
                <p>Verifică sau anulează rezervările active.</p>
              </div>
            </div>
          </div>
        );
    }
  };

return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">SmartOffice</div>
        <button className="logout-btn" onClick={handleLogout}>Delogare</button>
      </header>
      
      <main className="home-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default Home;