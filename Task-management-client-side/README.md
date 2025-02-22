# Task Management Application

## 🚀 Overview
This is a **Task Management Application** where users can add, edit, delete, and reorder tasks using a **drag-and-drop** interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. Changes are saved instantly in the database for persistence.

## 🌟 Live Demo
🔗 [Live Application](#) (Deploy the app and add the link here)
<!-- 🔗 [Backend API](#) (Deploy the backend and add the link here) -->

## 📌 Features
✅ User Authentication (Google Sign-in via Firebase)  
✅ Add, Edit, Delete, and Reorder Tasks  
✅ Drag-and-Drop Functionality  
✅ Real-time Sync using WebSockets  
✅ Optimistic UI Updates  
✅ Fully Responsive Design  
✅ Dark Mode Toggle 🌙  
✅ Task Due Dates with Color Indicators  
✅ Activity Log for Tracking Changes  

## 🛠️ Tech Stack
### **Frontend:**
- React (Vite.js)
- Tailwind CSS + DaisyUI
- Firebase Authentication
- Axios
- react-beautiful-dnd (for drag-and-drop)

### **Backend:**
- Node.js + Express.js
- MongoDB (Mongoose ORM)
- WebSockets (Socket.io)
- Firebase Admin SDK

### **Deployment:**
- **Frontend:** Firebase Hosting
- **Backend:** Vercel / Render
- **Database:** MongoDB Atlas

## 🏗️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/pro-majidul/Task-Management-System
 cd Task-Management-System
```

### 2️⃣ Backend Setup
```sh
 cd Task-management-server-side
 npm install
 npm start
```
Create a `.env` file in the `backend` folder and add:
```
MONGO_URI=your_mongodb_uri
PORT=5000
FIREBASE_ADMIN_CREDENTIALS=your_firebase_admin_credentials
```

### 3️⃣ Frontend Setup
```sh
 cd Task-management-client-side
 npm install
 npm run dev
```
Create a `.env` file in the `frontend` folder and add:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 🔥 API Endpoints
| Method | Endpoint        | Description                  |
|--------|----------------|------------------------------|
| POST   | `/tasks`       | Add a new task               |
| GET    | `/tasks`       | Retrieve all tasks           |
| PUT    | `/tasks/:id`   | Update task details          |
| DELETE | `/tasks/:id`   | Delete a task                |

## 🛠️ Best Practices Followed
- **Modular folder structure** for better maintainability.
- **Optimistic UI updates** for a smooth user experience.
- **Real-time updates** using WebSockets.
- **Mobile-friendly UI** with a clean and minimalistic design.

## 🎯 Future Enhancements
- ✅ Email notifications for due tasks.
- ✅ Team collaboration with shared task boards.
- ✅ AI-based task prioritization.

## 🙌 Contribution
Feel free to contribute! Fork the repo, make your changes, and submit a pull request.

