# MatchFinder — Frontend

This is the frontend application for **MatchFinder** — a simple app to discover sports matches, save favorites, and manage matches (admin-only features).
``
##Frontend Live Link:

## Backend Repo

Repo Link : https://github.com/Chandu5342/MatchBackend.git
Backend Live : https://matchbackend.onrender.com
``

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

## API Endpoints (overview)

### Auth

| Method | Endpoint     | Description                    |
|--------|--------------|--------------------------------|
| POST   | `/auth/register` | Register new user            |
| POST   | `/auth/login`    | Login, returns token + user  |
| GET    | `/auth/me`       | Get user from token (protected) |

### Matches

| Method | Endpoint         | Description                                 | Access         |
|--------|------------------|---------------------------------------------|----------------|
| GET    | `/matches`       | List matches (supports `sport`, `search`)   | Authenticated  |
| POST   | `/matches`       | Create match                                | Admin only     |
| PUT    | `/matches/:id`   | Update match                                | Admin only     |
| DELETE | `/matches/:id`   | Delete match                                | Admin only     |

### Favorites

| Method | Endpoint               | Description                     | Access        |
|--------|------------------------|---------------------------------|---------------|
| POST   | `/favorites/:matchId`  | Add to favorites                | Authenticated |
| DELETE | `/favorites/:matchId`  | Remove from favorites           | Authenticated |

---


## Environment

Create a `.env` file (Vite) with your API base URL:

```env
VITE_API_URL=https://matchbackend.onrender.com
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

## Test  Account 
User

- Email: `chandu@gmail.com`
- Password: `123456`

Admin

- Email: `admin@gmail.com`
- Password: `123456`

When logged in as admin you'll see Add / Edit / Delete controls on the Matches page.

---

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/f17bc73b-b6d3-48d1-95e9-e46c50e6e4e4" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/89bb1c40-3a80-49fc-9f7d-67754b31b2d6" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/7ed3bad8-2dc5-4ff3-9a68-55aa892f39d9" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/924f01df-a6b8-4017-94b3-f5f329993d8c" />

**For the Admin**
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a64c2a57-ae3c-4f5f-afb4-1e3ff05357df" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/1ffd3544-8689-404c-8908-935248ddbbe8" />








