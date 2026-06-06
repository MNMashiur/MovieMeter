# 🎬 MovieMeter

MovieMeter is a full-stack movie discovery and review platform inspired by IMDb, Letterboxd, and Netflix UI design. Users can browse trending movies, view detailed movie information, add favorites, rate movies, write reviews, and manage personal profiles securely.
---
#Deployed on: [moviemeter-web.vercel.app](https://moviemeter-web.vercel.app/)
---

# 🚀 Features

## 🔍 Movie Discovery

* Browse popular movies
* Search movies dynamically
* Responsive movie grid layout
* TMDB API integration

---

## 🎥 Movie Details Page

Each movie has its own dedicated details page containing:

* Movie poster
* Backdrop/banner
* Overview/description
* Genres
* Runtime
* Release date
* Director
* Cast information

---

## ⭐ Ratings & Reviews

Users can:

* Rate movies (1–5 stars)
* Write reviews
* View average ratings
* Read public reviews from other users

Reviews are stored permanently in MongoDB.

---

## ❤️ Favorites System

Users can:

* Add movies to favorites
* Remove favorites
* Keep favorites saved permanently across logins

Favorites are stored in MongoDB per account.

---

## 🔐 Authentication System

Secure authentication includes:

* User registration
* Login system
* Password hashing with bcrypt
* JWT authentication
* Protected profile access

---

## 👤 User Profile

Users can:

* View profile
* Edit profile information
* Change password
* Logout securely

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* CSS3

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* JWT
* bcryptjs

## External API

* TMDB API

---

# 📂 Project Structure

```bash
MovieMeter/
│
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── Context/
│   ├── Services/
│   ├── CSS/
│   └── App.jsx
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── config.env
│   └── server.cjs
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/MNMashiur/MovieMeter.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd server

npm install
```

---

# 🔑 Environment Variables

Create a `config.env` file inside the `server` folder.

```env
ATLAS_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# ▶️ Run Backend

```bash
node server/server.cjs
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint               | Description    |
| ------ | ---------------------- | -------------- |
| POST   | `/api/auth/register`   | Register user  |
| POST   | `/api/auth/login`      | Login user     |
| PUT    | `/api/auth/update/:id` | Update profile |

---

## Reviews

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| POST   | `/api/reviews`          | Add review        |
| GET    | `/api/reviews/:movieId` | Get movie reviews |

---

## Favorites

| Method | Endpoint                          | Description     |
| ------ | --------------------------------- | --------------- |
| POST   | `/api/favorites`                  | Add favorite    |
| GET    | `/api/favorites/:userId`          | Get favorites   |
| DELETE | `/api/favorites/:userId/:movieId` | Remove favorite |

---

# 🔒 Security Features

* Password hashing using bcrypt
* JWT token authentication
* Protected routes
* MongoDB secure cloud storage
* Environment variables for secrets

---

# 📸 Future Improvements

* Trailer integration
* Watchlist system
* Recommendation engine
* Social following system
* Movie download/streaming integration
* Admin dashboard
* Dark/Light theme toggle
* AI movie recommendations

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

Developed by **Mashiur Rahaman**

GitHub:
https://github.com/MNMashiur

---

# ⭐ Support

If you like this project, consider giving it a star on GitHub.
