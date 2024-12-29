# Social Media Dashboard Web Application

This is a comprehensive Social Media Dashboard web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The objective of this assignment is to showcase expertise as an experienced MERN stack developer by creating a full-fledged social media management platform.

Check out the live version of the project: <a href="https://cms-web-app-07.web.app/" target="_blank">Social Dashboard</a>

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Backend](#backend)
- [Frontend](#frontend)
- [Authentication](#authentication)
- [Database](#database)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Backend
- Develop a RESTful API for handling social media data, including posts, comments, and user profiles.
- Implement user authentication and authorization using JWT (JSON Web Tokens).

### Frontend
- Design a user-friendly dashboard interface for managing social media content.
- Allow users to interact with posts (like, comment, share).
- Implement user registration and login functionalities.

## Technologies Used
- **Backend**:
  - Node.js and Express.js for building the server.
  - MongoDB as the database to store social media content.
  - Passport.js for authentication.
  
- **Frontend**:
  - React.js for building the user interface.
  - useContext for state management.
  - Axios for making API requests.
  
- **Authentication**:
  - JWT (JSON Web Tokens) for secure user authentication.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/rajan624/social_dashboard.git
   ```

2. Install the backend dependencies:

   ```bash
   cd social-dashboard/Back_End
   npm install
   ```

3. Install the frontend dependencies:

   ```bash
   cd ../Front_End
   npm install
   ```

## Getting Started

### Backend

1. Set up your MongoDB database and update the database configuration in `backend/config/db.js`.

2. Configure the JWT secret key in `backend/config/passport.js`.

3. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

### Frontend

1. Configure the API base URL in `frontend/src/config/api.js` to match your backend server.

2. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

## Folder Structure

- **backend**: Contains the Node.js and Express.js server code.
- **frontend**: Contains the React.js frontend code.

### Backend `.env` File

In the backend folder, create a `.env` file to store configuration variables like your MongoDB connection URI and JWT secret key.

```env
# MongoDB Connection URI
MONGODB_URI=your_mongodb_uri_here

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key_here

# Port for the Backend Server
PORT=4000
```

Make sure to replace `your_mongodb_uri_here` and `your_jwt_secret_key_here` with your actual MongoDB URI and a secure JWT secret key, respectively.

### Frontend `.env` File

In the frontend folder, you can create a `.env` file to store configuration variables specific to the frontend, such as the API base URL.

```env
# API Base URL
REACT_APP_API_URL=http://localhost:4000/api

# Other frontend environment variables can go here
```

Ensure that you replace `http://localhost:3001/api` with the actual API URL of your backend server.

Remember not to commit these `.env` files to your version control system (e.g., Git) to keep your sensitive information secure. Instead, add them to your `.gitignore` file.

Also, note that you may need additional environment variables depending on your specific project requirements.

## Authentication

Authentication is implemented using JWT (JSON Web Tokens). Users can register, log in, and obtain a token to access protected routes.

## Database

MongoDB is used as the database to store social media content, including posts, comments, and user profiles. You can customize the schema and database interactions in the backend code.

## Usage

This application serves as a template for building a Social Media Dashboard. You can extend its functionality and design to meet your specific requirements.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
