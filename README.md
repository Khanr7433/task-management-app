# Task Management App

A full-stack task management application designed to help users organize their tasks efficiently. This project consists of a React-based frontend and a Node.js/Express backend.

## 🚀 Live Demo

Check out the live application here: **[https://task-management-app-client-six.vercel.app/](https://task-management-app-client-six.vercel.app/)**

## 🛠️ Tech Stack

### Client (Frontend)
The frontend is built with modern web technologies to ensure a fast and responsive user experience.
-   **Framework:** [React](https://react.dev/) (v19)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router DOM](https://reactrouter.com/)
-   **HTTP Client:** [Axios](https://axios-http.com/)

### Server (Backend)
The backend provides a robust API for authentication and task management.
-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
-   **Authentication:** JSON Web Tokens (JWT) & bcryptjs
-   **Utilities:** cors, dotenv, nodemon

## 📂 Project Structure

```
task-management-app/
├── client/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
-   Node.js installed on your machine.
-   MongoDB installed locally or a MongoDB Atlas connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd task-management-app
    ```

2.  **Setup Server:**
    ```bash
    cd server
    npm install
    ```
    *Create a `.env` file in the `server` directory and add your environment variables (PORT, MONGO_URI, JWT_SECRET, etc.).*

3.  **Setup Client:**
    ```bash
    cd ../client
    npm install
    ```
    *Create a `.env` file in the `client` directory and add your environment variables (e.g., `VITE_BASE_URL=http://localhost:5000`).*

## 🏃‍♂️ Running the Application

### Start the Server
```bash
cd server
npm run dev
```
*Runs on `http://localhost:5000` (or your configured port).*

### Start the Client
```bash
cd client
npm run dev
```
*Runs on `http://localhost:5173` (by default).*

## ✨ Features
-   User Authentication (Login/Register)
-   Create, Read, Update, and Delete (CRUD) Tasks
-   Responsive Design
-   Secure API endpoints
