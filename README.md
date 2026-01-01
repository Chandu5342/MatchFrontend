# MatchFinder — Frontend

This is the frontend application for **MatchFinder** — a simple app to discover sports matches, save favorites, and manage matches (admin-only features).

---

## Features

* **Authentication**
  * Login and register
  * JWT token stored in context / localStorage
  * Role-based UI (admin vs normal user)
* **Browse Matches**
  * List of upcoming matches with filters (sport) and search by team
  * Favorite matches (★)
* **Admin Module**
  * Add / Edit / Delete matches (admin-only)
  * Inline form for create & edit on the Matches page
* **Other**
  * Landing page
  * Responsive card layout using Bootstrap classes

---

## Folder Structure

```
frontend/
│── public/
│── src/
│   ├── api/          # Axios API calls (auth, match, favorite)
│   ├── components/   # Reusable components (Navbar, ProtectedRoute)
│   ├── context/      # AuthContext for auth + token persistence
│   ├── pages/        # Pages (Landing, Matches, Favorites, Login, Register)
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
│── package.json
```

---

## Tech Stack

* React + Vite
* React Router for routing
* Axios for API requests
* React Context for global auth state
* Bootstrap utility classes for styling
* JWT-based authentication

---

## Pages / Routes

| Route     | Component | Access |
|-----------|-----------|--------|
| `/`       | Landing   | Public |
| `/login`  | Login     | Public |
| `/register` | Register | Public |
| `/matches` | Matches   | Protected (requires login) |
| `/favorites` | Favorites | Protected |

---

## Environment

Create a `.env` file (Vite) with your API base URL:

```env
VITE_API_URL=http://localhost:5000
```

Make sure backend is running and CORS allows requests from the frontend origin.

---

## Run locally

```bash
# from repo root
cd frontend
npm install
npm run dev
```

Default dev URL: `http://localhost:5173` (or Vite's assigned port)

---

## Test Admin Account (seed script)

After running backend seed script, use:

- Email: `admin@example.com`
- Password: `admin123`

When logged in as admin you'll see Add / Edit / Delete controls on the Matches page.

---

## Notes

* Keep the backend `VITE_API_URL` updated to match your backend server.
* The frontend expects the login response to include `token` and `user.role` to enable admin features.
