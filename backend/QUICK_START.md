# 🚀 Quick Start Guide

## To Fix "ERR_CONNECTION_REFUSED" Error

This error means the **backend server is not running**. Follow these steps:

### Step 1: Start the Backend Server

Open a **terminal/command prompt** and run:

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB!
✅ Server listening on port 5000
📍 Auth API: http://localhost:5000/api/auth/login
```

**Keep this terminal open** - the server must stay running!

### Step 2: Start the Frontend

Open a **NEW terminal/command prompt** and run:

```bash
cd frontend
npm start
```

The frontend will open in your browser (usually `http://localhost:3000`)

### Step 3: Test the Connection

1. The backend should be running on `http://localhost:5000`
2. The frontend should be running on `http://localhost:3000` (or another port)
3. Try to login/register from the frontend

## Troubleshooting

### Backend won't start?

**Check your `.env` file:**
- Make sure `MONGO_URI` has your **real** MongoDB connection string
- Not the placeholder: `mongodb+srv://username:password@cluster.mongodb.net/SmartHack`

**Check if port 5000 is already in use:**
```bash
netstat -ano | findstr :5000
```

### Still getting connection errors?

1. **Verify backend is running**: Open `http://localhost:5000` in browser
   - Should show: `{"message":"Backend funcționează!"}`

2. **Check browser console**: Look for the exact error message

3. **Check backend terminal**: Look for any error messages

### MongoDB Connection Issues?

If you see MongoDB errors:
- Make sure your MongoDB connection string is correct
- Make sure your MongoDB cluster is running (if using Atlas)
- Make sure your IP is whitelisted (if using Atlas)
- Check your internet connection

## Both Servers Must Run Simultaneously!

- ✅ Backend: `http://localhost:5000` (must be running)
- ✅ Frontend: `http://localhost:3000` (must be running)

You need **TWO terminals** - one for backend, one for frontend!

