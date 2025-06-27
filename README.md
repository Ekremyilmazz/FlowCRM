# FlowCRM | Customer Relationship Management System
FlowCRM is a functional, scalable, and secure Customer Relationship Management (CRM) system built using modern technologies. 
It helps businesses manage customer data, track sales, and improve internal workflows. The project is developed with a modular architecture and includes frontend, backend, and database layers.

## 🚀 Features
- User authentication and role-based authorization (Admin, Manager, Staff)
- Customer, product, and sales management
- Responsive and modern user interface
- Real-time interactions and secure data flow
- API-based architecture
- Scalable container-based deployment

## 💻 Technologies Used

### 🧩 Frontend Technologies
- Next.js: A powerful React-based framework with built-in support for SSR (Server Side Rendering), static site generation, and file-based routing. It improves SEO and performance.
- Tailwind CSS: A utility-first CSS framework that helps build responsive and customizable UI designs efficiently.
- Shadcn/UI: A headless UI component library that works seamlessly with Tailwind CSS. All components are customizable and accessible.

## ⚙️ Backend Technologies
- Node.js & Express.js: Backend is built with Express.js using a RESTful API structure. All business logic is implemented in a modular way.
- JWT Authentication: Secure authentication system using JSON Web Tokens, supporting role-based access control.
- Bcrypt: Passwords are hashed and salted before being stored in the database for enhanced security.

## 🗄️ Database
- PostgreSQL: A powerful relational database system with support for JSON, high-level security, and scalability.
- pgAdmin4: GUI tool for managing the PostgreSQL database.
- pg (node-postgres): PostgreSQL is connected to the backend using the pg library (import { Pool } from 'pg').

## 🛠️ DevOps & Tools
- Docker: The application is containerized for easy deployment. Frontend, backend, and database each run in separate containers.
- Docker Compose: Used to manage multi-container applications.
- Postman: Used for testing RESTful APIs (GET, POST, etc.).
- GitHub: Version control and collaborative development platform.

## 📥 Installation

1. Clone the repository

   ```bash
   https://github.com/Ekremyilmazz/FlowCRM.git
2. Option 1: Run with Docker
   ```
   docker-compose up --build
3. Option 2: Run manually
   ```bash
   cd server npm install npm run dev
   cd client npm install npm run dev

## 🌐 Environment Variables
- Make sure to create .env files in both the client and server directories with necessary variables:

### Example .env for Server:
- PORT=5000
- DATABASE_URL=your_postgresql_connection_string
- JWT_SECRET=your_jwt_secret

## 📸 Screenshots

### Dashboard
![Image](https://github.com/user-attachments/assets/763d7263-79d3-4a5e-853a-c713e74880b8)
### Products Page
![Image](https://github.com/user-attachments/assets/d20544b1-b973-4199-bb4e-102efb585ec4)
### Users Page
![Image](https://github.com/user-attachments/assets/3e48641f-39bf-464f-9915-50848c123fd3)
### Tasks Page
![Image](https://github.com/user-attachments/assets/ac2c4bc1-9a38-4b0e-b96e-c697f322fcc0)
### Notifications Page (Filtering By User ID)
![Image](https://github.com/user-attachments/assets/7ba97a40-7596-4452-a7df-5de7fc34ab61)
