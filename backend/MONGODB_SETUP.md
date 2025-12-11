# MongoDB Atlas Setup Guide

## MONGO_URI Environment Variable

The `MONGO_URI` environment variable should contain your **actual MongoDB connection string**, not placeholder text.

### For Local Development

```env
MONGO_URI=mongodb://localhost:27017/campushub
```

### For MongoDB Atlas (Production)

Your MongoDB Atlas connection string will look like this:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/campushub?retryWrites=true&w=majority
```

## How to Get Your MongoDB Atlas Connection String

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Sign in** to your account
3. **Select your cluster** (or create a new one)
4. **Click "Connect"** button
5. **Choose "Connect your application"**
6. **Copy the connection string** - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
7. **Replace the placeholders**:
   - `<username>` → Your MongoDB database username
   - `<password>` → Your MongoDB database password
   - `<dbname>` → Your database name (e.g., `campushub`)

## Example

If your username is `admin`, password is `MySecurePass123`, and database name is `campushub`:

```env
MONGO_URI=mongodb+srv://admin:MySecurePass123@cluster0.xxxxx.mongodb.net/campushub?retryWrites=true&w=majority
```

## Important Notes

- **Never commit your `.env` file** to version control
- **Use strong passwords** for your MongoDB Atlas database user
- **Whitelist IP addresses** in MongoDB Atlas Network Access (or use `0.0.0.0/0` for development)
- **Update your password** if you suspect it's been compromised

## Setting Environment Variables

### Local Development
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_actual_connection_string_here
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
PORT=5000
```

### Production (Render)
Set environment variables in Render dashboard:
- Go to your service → Environment
- Add each variable:
  - `MONGO_URI` = your MongoDB Atlas connection string
  - `JWT_SECRET` = a strong random string
  - `CLIENT_URL` = your frontend URL
  - `PORT` = (Render sets this automatically)

