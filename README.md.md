
# **YouTube Clone Project Documentation**

## **Project Overview**

This project is a **YouTube clone** built using the MERN stack (MongoDB, Express, React, Node.js). It replicates core features of YouTube, including user authentication, video upload and playback, search functionality, like/dislike feature, and a personalized user channel page.

The project is structured for scalability and clean code practices, making use of ES modules, RESTful APIs, and modern frontend techniques like Tailwind CSS for styling.

## **Technology Stack**

### **Frontend**
- **React**: For building the user interface.
- **Vite**: A faster development environment for React.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router**: For handling client-side routing.

### **Backend**
- **Node.js**: For server-side JavaScript.
- **Express**: A lightweight web framework for building APIs.
- **MongoDB**: A NoSQL database for storing video and user data.
- **JWT**: For handling user authentication securely.

## **Project Setup**

### **Prerequisites**
- Node.js and npm installed
- MongoDB instance running locally or in the cloud (e.g., MongoDB Atlas)
- A `.env` file for environment variables

### **Environment Variables**
Create a `.env` file in the root of the backend with the following:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`

### **Project Installation**

1. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/vishwaskwatra/YouTube-Clone-MERN.git
   cd YouTube-Clone-MERN
   \`\`\`

2. **Install Dependencies**
   - For the Backend:
     \`\`\`bash
     cd backend
     npm install
     \`\`\`
   - For the Frontend:
     \`\`\`bash
     cd frontend
     npm install
     \`\`\`

3. **Run the Project**
   - **Backend**:
     \`\`\`bash
     cd backend
     npm start
     \`\`\`
   - **Frontend**:
     \`\`\`bash
     cd frontend
     npm run dev
     \`\`\`

### **Directory Structure**

#### **Backend**
\`\`\`
/backend
  ├── controllers
  │   ├── authController.js
  │   ├── videoController.js
  │   └── commentController.js
  ├── models
  │   ├── userModel.js
  │   └── videoModel.js
  ├── routes
  │   ├── authRoutes.js
  │   ├── videoRoutes.js
  │   └── commentRoutes.js
  ├── middleware
  │   └── authMiddleware.js
  ├── app.js
  └── server.js
\`\`\`

#### **Frontend**
\`\`\`
/frontend
  ├── src
      ├── components
      │   ├── NavBar.jsx
      │   ├── Sidebar.jsx
      │   ├── PrivateRoute.jsx
      │   └── SearchBar.jsx
      ├── context
      │   └── UserContext.jsx
      ├── pages
      │   ├── HomePage.jsx
      │   ├── LoginPage.jsx
      │   ├── SearchResults.jsx
      │   ├── VideoPlayback.jsx
      │   └── ChannelPage.jsx
      ├── App.jsx
      └── main.jsx
\`\`\`

## **Features**

### **User Authentication**
- **Registration**: Users can create an account with a username and password.
- **Login**: Authenticated using JWT for secure sessions.
- **Protected Routes**: Certain pages (e.g., Home, Video Playback, Channel) are accessible only when logged in.

### **Video Management**
- **Upload**: Authenticated users can upload videos with title, description, thumbnail, and the video file.
- **Playback**: Users can view uploaded videos, with metadata like title and description.
- **Search**: Search videos by title, description, or uploader with filters.
- **Like/Dislike**: Users can interact with videos using like/dislike buttons.
- **Channel Management**: Owners can manage and edit their videos on a dedicated channel page.

### **Comments System**
- **Post**: Users can comment on videos.
- **Delete**: Owners of comments can delete them.

### **Responsive Design**
- Tailwind CSS provides a responsive and mobile-friendly interface similar to YouTube.

## **API Endpoints**

### **Authentication**
| Method | Endpoint        | Description                |
|--------|-----------------|----------------------------|
| POST   | /api/auth/register | Register a new user        |
| POST   | /api/auth/login    | Log in an existing user    |

### **Video**
| Method | Endpoint                       | Description                          |
|--------|--------------------------------|--------------------------------------|
| POST   | /api/videos                    | Upload a new video                   |
| GET    | /api/videos                    | Retrieve all videos                  |
| GET    | /api/videos/:id                | Retrieve a single video by ID        |
| PATCH  | /api/videos/:id                | Update a video by ID                 |
| DELETE | /api/videos/:id                | Delete a video by ID                 |
| GET    | /api/videos/search?query=      | Search videos with filters           |
| GET    | /api/videos/user/:userId       | Retrieve videos uploaded by a user   |

### **Comments**
| Method | Endpoint                       | Description                          |
|--------|--------------------------------|--------------------------------------|
| POST   | /api/comments                  | Post a new comment                   |
| DELETE | /api/comments/:id              | Delete a comment by ID               |

## **Frontend Components Overview**

### **NavBar**
- Top navigation bar with the YouTube logo, search bar, and user icons.
- Styled with a light and minimalistic theme using Tailwind CSS.

### **Sidebar**
- A collapsible sidebar containing navigation links: Home, Trending, Subscriptions, Library, Channel, and History.
- Styled in white and red to match YouTube's theme.

### **HomePage**
- Displays a feed of videos, with options to filter and search.
- Fetches video data from the backend.

### **VideoPlayback**
- Plays a selected video, showing relevant information and user interactions (like/dislike, comments).
- Comments section below the video for user interactions.

### **ChannelPage**
- User's personalized page to manage and edit their uploaded videos.
- Authenticated actions to update or delete videos.

## **How to Run and Test the Project**

### **Running the Application**
- Ensure MongoDB is running locally or the MongoDB URI is correctly set in `.env`.
- Run the backend and frontend concurrently using the commands provided in the setup.
- Open the frontend in a browser at the local development URL provided by Vite.

### **Testing APIs**
- APIs can be tested using tools like **Postman** or **cURL**.
- API endpoints are protected using JWT, so you need to authenticate first and use the token for protected routes.
- Snapshots can be taken to demonstrate the functionality of each API.

## **Conclusion**

This YouTube clone covers a wide range of functionalities while keeping the code modular and clean. It uses modern technologies to mimic the core features of YouTube and can serve as a foundation for building more complex video-sharing platforms.
