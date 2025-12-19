# Frontend API Configuration Update

## Current State

Your frontend files currently use hardcoded `http://localhost:5000` for API calls.

## What Was Created

- **`client/src/config/api.js`**: Centralized API URL configuration
- **`client/.env.example`**: Template for environment variables

## Before Deployment - Update API URLs

You have **two options**:

### Option 1: Use Centralized Config (Recommended)

Update all fetch calls to use the centralized configuration:

**Before:**

```javascript
const response = await fetch("http://localhost:5000/auth/login", {
```

**After:**

```javascript
import API_URL from '../config/api.js';

const response = await fetch(`${API_URL}/auth/login`, {
```

### Option 2: Keep as-is for now

Your app will work locally. Before deploying:

1. Find all `localhost:5000` references
2. Replace with `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`

## Files with Hardcoded URLs (Found 14 instances)

- `RegisterPage.jsx` (1)
- `LoginPage.jsx` (1)
- `MainPage.jsx` (4)
- `AdminUpload.jsx` (5)
- `DetailPage.jsx` (2)
- `FavoritesPage.jsx` (1)

## For Local Development

No changes needed! The config file defaults to `localhost:5000`.

## For Production Deployment

1. Create `.env` file in `client/` directory:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
2. Follow `DEPLOYMENT.md` guide

---

**Note**: This is optional for now. You can deploy with hardcoded URLs and update them later if needed, but using environment variables is the recommended approach for production apps.
