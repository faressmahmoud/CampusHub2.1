# MongoDB Atlas Setup - Quick Guide

## Current Setup: Local MongoDB

Your `.env` is currently configured for **local MongoDB**:
```env
MONGO_URI=mongodb://localhost:27017/campushub
```

This works if you have MongoDB installed locally.

## To Switch to MongoDB Atlas:

1. **Get your connection string from MongoDB Atlas:**
   - Go to https://cloud.mongodb.com
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

2. **It will look like:**
   ```
   mongodb+srv://faressmahmoud_db_user:i0RW3vatxEnQOOBD@cluster0.XXXXX.mongodb.net/campushub?retryWrites=true&w=majority&appName=Cluster0
   ```
   **Replace `XXXXX` with your actual cluster identifier** (e.g., `abc123`, `xyz789`, etc.)

3. **Update `backend/.env`:**
   ```env
   MONGO_URI=mongodb+srv://faressmahmoud_db_user:i0RW3vatxEnQOOBD@cluster0.YOUR_CLUSTER_ID.mongodb.net/campushub?retryWrites=true&w=majority&appName=Cluster0
   ```

4. **Make sure in MongoDB Atlas:**
   - Network Access: Add your IP address (or `0.0.0.0/0` for development)
   - Database User: `faressmahmoud_db_user` exists with password `i0RW3vatxEnQOOBD`

## To Use Local MongoDB:

If you want to use local MongoDB, make sure it's running:
```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or start manually
mongod
```

Then your current `.env` will work!

