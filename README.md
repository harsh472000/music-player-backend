# 🎶 Music Player Backend

This is the backend for the **Music Player Application**, built using **Node.js**, **Express.js**, and **MongoDB**. It provides RESTful APIs for user authentication, playlist management, and integration with the frontend.

🌐 Deployed at: [http://3.110.167.205:5000](http://3.110.167.205:5000)

---

## 📬 API Testing Collection

You can explore and test the backend APIs using this shared Postman collection:  
🔗 [devTinder Postman Collection](https://devtinder-3678.postman.co/workspace/devTinder~b31a5bcb-9699-4335-8f83-35785e57a509/collection/16223330-de04b692-1f6c-4647-8c73-5ee1e496f5d6?action=share&creator=16223330)

---

## ✅ Features

- 🔐 JWT-based authentication (login/register)
- 🎵 Playlist creation, deletion, and song management
- 🧩 Mongoose schemas for Users and Playlists
- 🔄 CORS support for multiple frontend origins (local + Vercel)
- ⚙️ Environment variable configuration
- 📦 MongoDB Atlas integration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- bcryptjs (for password hashing)
- dotenv (for environment configuration)
- cors (Cross-Origin Resource Sharing)

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/music-player-backend.git
cd music-player-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://3.110.167.205:5000
FRONTEND_S_URL=https://music-player-frontend-psi.vercel.app
```

### 4. Start the server

```bash
node index.js
# or if using nodemon
npx nodemon index.js
```

Server should run at: [http://localhost:5000](http://localhost:5000)

---

## 🌍 Deployed Backend

The backend is deployed on an **AWS EC2 instance** at:  
🔗 [http://3.110.167.205:5000](http://3.110.167.205:5000)

Ensure port **5000** is open in the EC2 security group.

---

## 📁 Project Structure

```
.
├── config/
│   └── db.js             # MongoDB connection setup
├── models/
│   ├── User.js           # User schema
│   └── Playlist.js       # Playlist schema
├── routes/
│   ├── authRoutes.js     # Auth endpoints
│   └── playlistRoutes.js # Playlist endpoints
├── .env                  # Environment variables
├── index.js              # Server entry point
├── package.json
└── README.md
```

---

## 🔐 API Endpoints

### Auth

- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login and receive JWT token

### Playlists

- `GET /api/playlists` – Get user's playlists
- `POST /api/playlists` – Create a new playlist
- `PUT /api/playlists/:id` – Update a playlist
- `DELETE /api/playlists/:id` – Delete a playlist
- `POST /api/playlists/:playlistid/songs` - Add song in playlist
- `DELETE /api/playlists/:playlistid/songs/songid` - delete song from playlist

---

## 🧪 Testing

Use tools like **Postman** or **Thunder Client** to test API routes locally or via the live server.

---

## 📦 Deployment Notes

- Ensure Node.js and npm are installed on your EC2 instance.
- Use `pm2` or `screen` to keep the server running in the background:
  ```bash
  npm install -g pm2
  pm2 start index.js
  pm2 save
  pm2 startup
  ```
- Open port 5000 in your EC2 security group to allow external access.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙌 Acknowledgments

- MongoDB Atlas
- Express.js Community
- AWS EC2
- Vercel for frontend deployment



