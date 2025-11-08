# 🔐 Sistemul de Autentificare - Explicații Complete

## 📋 Structura User Schema

### Câmpuri principale:
- **username**: Nume unic pentru login (3-30 caractere)
- **password**: Parola (hash-uită automat cu bcrypt, minim 6 caractere)
- **email**: Email unic și valid
- **fullName**: Nume complet (opțional)
- **role**: Rolul userului (`user`, `admin`, `moderator`, `editor`)
- **permissions**: Array cu permisiuni specifice
- **isActive**: Cont activ/inactiv
- **isVerified**: Cont verificat/neverificat
- **lastLogin**: Data ultimului login
- **loginAttempts**: Număr încercări de login eșuate
- **timestamps**: `createdAt` și `updatedAt` (automat)

---

## 🚀 Cum să Folosești API-ul

### 1. Înregistrare User Nou

**Endpoint:** `POST /api/auth/register`

**Body (JSON):**
```json
{
  "username": "tudor",
  "email": "tudor@example.com",
  "password": "parola123",
  "fullName": "Tudor Pantofaru"
}
```

**Răspuns Success (201):**
```json
{
  "success": true,
  "message": "Cont creat cu succes",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6730abc123def456789",
    "username": "tudor",
    "email": "tudor@example.com",
    "fullName": "Tudor Pantofaru",
    "role": "user",
    "permissions": []
  }
}
```

---

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Body (JSON):**
```json
{
  "username": "tudor",
  "password": "parola123"
}
```

**Răspuns Success (200):**
```json
{
  "success": true,
  "message": "Login cu succes",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6730abc123def456789",
    "username": "tudor",
    "email": "tudor@example.com",
    "role": "user",
    "permissions": [],
    "lastLogin": "2025-11-08T14:30:00.000Z"
  }
}
```

---

### 3. Obține Profil (necesită autentificare)

**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Răspuns Success (200):**
```json
{
  "success": true,
  "user": {
    "id": "6730abc123def456789",
    "username": "tudor",
    "email": "tudor@example.com",
    "fullName": "Tudor Pantofaru",
    "role": "user",
    "permissions": [],
    "isActive": true,
    "createdAt": "2025-11-08T10:00:00.000Z"
  }
}
```

---

### 4. Actualizare Rol (doar admin)

**Endpoint:** `PATCH /api/auth/update-role`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Body (JSON):**
```json
{
  "userId": "6730abc123def456789",
  "role": "moderator",
  "permissions": ["edit_posts", "delete_posts"]
}
```

---

## 🛡️ Securitate

### Hash-uirea Parolelor:
- Parola este automat hash-uită cu **bcrypt** înainte de salvare
- Salt rounds: 10
- Parola originală nu este niciodată stocată în database

### JWT Token:
- Token-ul expiră în **7 zile**
- Conține doar ID-ul userului (nu date sensibile)
- Se trimite în header: `Authorization: Bearer <token>`

### Protecție împotriva Brute Force:
- După **5 încercări greșite** de login, contul se blochează timp de **15 minute**
- Counter-ul se resetează la login success

---

## 🎭 Sistemul de Roluri și Permisiuni

### Roluri Predefinite:
1. **user** (implicit) - acces de bază
2. **editor** - poate edita conținut
3. **moderator** - poate modera utilizatori
4. **admin** - acces complet

### Permisiuni Disponibile:
- `create_posts`
- `edit_posts`
- `delete_posts`
- `manage_users`
- `view_analytics`
- `manage_settings`

### Exemplu: Protejare Route cu Rol

```javascript
import { protect, restrictTo } from '../middleware/auth.js';

// Doar utilizatori autentificați
router.get('/dashboard', protect, getDashboard);

// Doar admin și moderator
router.delete('/users/:id', protect, restrictTo('admin', 'moderator'), deleteUser);
```

### Exemplu: Protejare Route cu Permisiune Specifică

```javascript
import { protect, checkPermission } from '../middleware/auth.js';

// Doar utilizatori cu permisiunea 'delete_posts'
router.delete('/posts/:id', protect, checkPermission('delete_posts'), deletePost);
```

---

## 🧪 Testare cu Postman / Thunder Client

### 1. Register
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON): username, email, password
- Copiază token-ul din răspuns

### 2. Login
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON): username, password
- Copiază token-ul

### 3. Profile (cu token)
- Method: GET
- URL: `http://localhost:5000/api/auth/profile`
- Headers: `Authorization: Bearer <token-ul-tău>`

---

## 📝 Exemple de Folosire în Frontend (React)

### Register:
```javascript
const register = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

### Login:
```javascript
const login = async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

### Get Profile (cu token):
```javascript
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
```

---

## ⚙️ Configurare .env

Asigură-te că ai aceste variabile în `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/SmartHack
JWT_SECRET=your_super_secret_key_min_32_characters
NODE_ENV=development
```

---

## 🚀 Pornire Server

```bash
cd backend
npm install
npm run dev
```

Server pornește pe: `http://localhost:5000`

---

## 📌 Next Steps

1. ✅ Testează register și login în Postman
2. ✅ Verifică că token-ul funcționează pentru `/profile`
3. ⏭️ Creează alte modele (Tasks, Projects, etc.)
4. ⏭️ Adaugă mai multe route-uri protejate
5. ⏭️ Integrează cu frontend-ul React
