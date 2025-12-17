# User Management CRUD App

A full-stack backend project built using **Node.js, Express, MySQL, and EJS** that demonstrates complete CRUD (Create, Read, Update, Delete) functionality with real database integration.

---

## Features

- Create new users
- View all users
- Edit existing users (with password verification)
- Delete users
- Server-side rendering using EJS
- MySQL database integration using prepared statements
- Method override for PATCH and DELETE requests
- Clean and simple UI with custom CSS

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Templating Engine:** EJS  
- **Other Tools:**  
  - mysql2  
  - faker (for dummy data)  
  - method-override  
  - nodemon  

---

## Project Structure
├── views/
│   ├── home.ejs
│   ├── user.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   └── wrong-password.ejs
├── index.js
├── package.json
├── package-lock.json
└── README.md

---

## ⚙️ Installation & Setup

1. Clone the repository:

  git clone <your-repo-url>

2. Install dependencies:

  npm install

3. Set up MySQL database:

CREATE DATABASE my_db;

4.	Create user table:

CREATE TABLE user (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);

5.Start MySQL server (macOS example):

sudo /usr/local/mysql/support-files/mysql.server start

6. Run the app:

nodemon index.js

7. Open in browser:
http://localhost:8080


What I Learned
	•	Handling asynchronous database operations safely
	•	Using prepared statements to prevent SQL injection
	•	Designing proper Express routes
	•	Debugging real-world MySQL and Node.js errors
	•	Building maintainable backend logic



👤 Author
Mohammad Huzaif
Aspiring Software Engineer | Backend Development Enthusiast
