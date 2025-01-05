# Web Application with Admin Panel

## Overview
This is a full-stack web application featuring user authentication and an admin panel for managing user data. It is designed to handle sessions and cookies securely while allowing administrators to perform CRUD (Create, Read, Update, Delete) operations on user data.

Built using:
- **Node.js**: Backend runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js

---

## Features

### **User Features**
- **Signup**: Users can register with a unique username and password (hashed for security).
- **Login**: Users can log in with their credentials, and a session is created.
- **Home Page**: Accessible only after a successful login.
- **Logout**: Users can log out, and their session is terminated.

### **Admin Panel**
- **Admin Login**: A separate login system for administrators with role-based access control.
- **Manage Users**:
  - View all registered users.
  - Search for users by username.
  - Add new users.
  - Update user details (username, role, or password).
  - Delete users.

### **Security**
- Passwords are securely hashed using `bcrypt`.
- Sessions and cookies are managed using `express-session` and `cookie-parser`.
- Role-based access control ensures that only admins can access sensitive routes.

---

## Prerequisites
To run this application, you will need:
- Node.js installed
- MongoDB installed and running locally or accessible remotely

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
