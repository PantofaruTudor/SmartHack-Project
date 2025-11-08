// FIȘIERUL PRINCIPAL - Pornește serverul Express
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Încarcă variabilele de mediu din .env
dotenv.config();

// Creează aplicația Express
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
// CORS - permite frontend-ul să comunice cu backend-ul
app.use(cors());

// Parsează JSON din body-ul cererilor
app.use(express.json());

// Parsează URL-encoded data (formulare)
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
// Route simplu de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend SmartHack funcționează!',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running',
    port: PORT
  });
});

// ===== PORNIRE SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server pornit pe http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
});
