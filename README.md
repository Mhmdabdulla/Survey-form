Survey Form App (MERN Stack)

A clean, professional survey application built using the Repository Pattern and SOLID principles. This project features a public-facing submission form and a secure, JWT-authenticated Admin Dashboard to manage entries.

🌐 Quick Links

Live Demo: https://survey-form-vert-eight.vercel.app/

🛠 Tech Stack
Frontend: React.js, Context API, Tailwind CSS, React Hook Form + Zod.

Backend: Node.js, Express.js, MongoDB (Mongoose).

Security: JWT Authentication, Bcryptjs password hashing.

🏗 Architecture & Design
This project isn't just a simple CRUD app; it's built for scale using:

Repository Pattern
By separating business logic from data access, the app is:

Decoupled: The controllers don't care how the database works.

Maintainable: Swapping MongoDB for another database would only require changes in the Repository layer.

SOLID Principles
Single Responsibility: Separate files for Controllers, Services, and Repositories.

Dependency Inversion: High-level logic depends on abstractions, not low-level database details.

Validation: Dual-layer validation using Zod to ensure data integrity at both the UI and Database levels.

🚀 Key Features
User Form: Name, Nationality, Phone, Email, and Message fields.

Admin Panel: Secure login to view and manage all submitted data.

Responsive: Fully optimized for mobile and desktop screens.

Security: Protected Admin routes and encrypted credentials.

🚦 Getting Started
1. Clone & Install
git clone https://github.com/Mhmdabdulla/Survey-form.git
cd Survey-form

# Install Backend
cd backend && npm install

# Install Frontend
cd ../frontend && npm install
2. Environment Setup
Create a .env file in the /backend directory:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
3. Run Development Servers
Backend: cd backend && npm run dev

Frontend: cd frontend && npm run dev

👤 Author
Mohamed Abdulla

GitHub: @Mhmdabdulla
