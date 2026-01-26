📋 Survey-Master: Enterprise Grade Survey System

A robust, full-stack survey management application built with a focus on Clean Architecture, SOLID principles, and the Repository Pattern. This application allows users to submit detailed
feedback while providing a secure administrative dashboard for data management

🚀 Key Features

-Public Survey Interface: User-friendly form with real-time validation.
-Admin Dashboard: Secure area to view, manage, and analyze submissions.
-Admin Authentication: JWT-based login system with protected routes.
-Advanced Validation: Dual-layer validation (Client-side & Server-side).
-Responsive Design: Fully optimized for mobile, tablet, and desktop.

🛠 Tech Stack

-Frontend: React.js, Context API (State Management), Tailwind CSS.
-Backend: Node.js, Express.js.
-Database: MongoDB with Mongoose ODM.
-Security: JWT (JSON Web Tokens), Bcryptjs (Password Hashing).
-Validation: Zod  (Backend) and React Hook Form with zod (Frontend).

🏗 Architecture & Design Patterns

Repository Pattern
-Decoupling: The business logic is separated from the data access logic.
-Testability: Facilitates easy Mocking for Unit Testing.
-Maintainability: If we switch from MongoDB to PostgreSQL, we only change the Repository file, not the Business Logic.

SOLID Principles Implementation
S - Single Responsibility: Each class/function has one job (e.g., separate files for Controllers, Services, and Repositories).
O - Open/Closed: Entities are open for extension but closed for modification.
L - Liskov Substitution: Interfaces (if applicable) ensure that subclasses can replace base classes without errors.
I - Interface Segregation: Minimal and specific interfaces/contracts for data handling.
D - Dependency Inversion: High-level modules do not depend on low-level modules; both depend on abstractions.

🚀 Deployed on Cloud – Backend on Render, frontend on Vercel
🌐 Live Demo - https://survey-form-vert-eight.vercel.app/
🚦 Getting Started

Prerequisites
-Node.js (v16+)
-MongoDB (Atlas or Local)

Installation
1-Clone the repo - git clone https://github.com/Mhmdabdulla/Survey-form.git
2-Install Backend Dependencies - cd backend
npm install
3-Install Frontend Dependencies - cd frontend
npm install
4-Environment Variables Create a .env file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
5-Run the App
# In backend folder
npm run dev
# In frontend folder
npm run dev

👤 Author
Mohamed Abdulla
