🛡️ Backend Auth Service

A professional-grade user authentication and management system built with Node.js, Express, and MongoDB. This project features secure password hashing, JWT-based session management, and Redis for high-performance caching.

✨ Key Features
Secure Authentication: User signup and login with Bcrypt password hashing.

Session Management: Implementation of JSON Web Tokens (JWT) stored in secure HTTP-only cookies.

Performance Optimization: Integrated Redis for fast data retrieval and session handling.

Database Integration: Seamless connection to MongoDB Atlas using Mongoose.

Middleware Protection: Custom userAuth middleware to protect sensitive routes.

Validation: Robust data validation for user inputs during registration.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB (via Mongoose)

Caching: Redis

Security: Bcrypt, JWT, Cookie-Parser

🚀 Getting Started
1. Environment Configuration
Create a .env file in the root directory and add the following (ensure this file is ignored by Git):

Code snippet
DB_CONNECT_KEY="your_mongodb_connection_string"
SECRET_KEY="your_jwt_secret"
PORT=4000

2. Installation
Bash
npm install
3. Database & Redis Setup
Ensure your MongoDB cluster is active and your Redis server is running. The application initializes these connections in parallel before starting the server.

4. Running the App
Bash
# Start the server
node index.js
The server will start on port 4000 (or your configured .env port).

🛣️ API Architecture
Endpoint	Method	Description
/	POST	Auth routes (Login/Register via authRouter)
/user	GET/PATCH	User profile management
/info	GET	Fetches all users (Requires valid JWT cookie)
/	POST	Commenting functionality
🛡️ Security Implementation
Password Privacy: Passwords are never stored in plain text; they are hashed with a salt factor of 10.

Token Security: JWTs are verified against a SECRET_KEY stored in environment variables.


Environment Safety: Sensitive credentials like DB_CONNECT_KEY are excluded from version control via .gitignore.
