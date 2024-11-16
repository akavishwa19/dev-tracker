# DevTracker - Modern Task Management Application

DevTracker is a powerful, modern task management application designed specifically for developers and development teams. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it offers a clean, intuitive interface for managing development tasks efficiently.

Landing page
![image](https://github.com/user-attachments/assets/f1994a47-aa6c-41cf-8280-ac87e0fae6d4)

Dashboard page
![image](https://github.com/user-attachments/assets/ae00424b-fbc9-4ee8-98e6-46f3ea1edd4e)



## 🌟 Features

- **Task Management**
  - Create, view, edit, and delete tasks
  - Drag-and-drop task organization
  - Real-time updates
  - Priority and status management
  - Due date tracking
  - Task categorization with tags

- **User Interface**
  - Modern, responsive design
  - Dark/light mode support
  - Smooth animations and transitions
  - Intuitive task board and list views
  - Accessible components

- **Authentication & Security**
  - Secure user authentication
  - JWT-based authorization
  - Protected API routes
  - Rate limiting
  - Input validation

## 🚀 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Zustand for state management
- Framer Motion for animations
- Radix UI for accessible components
- TailwindCSS for styling
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript for type safety
- Prisma as ORM
- PostgreSQL database
- JWT for authentication
- Winston for logging
- Jest for testing

## 📦 Prerequisites

Before running the application, make sure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dev-tracker.git
   cd dev-tracker
   ```

2. **Set up the backend**
   ```bash
   cd api
   npm install
   
   # Create a .env file with the following variables:
   # DATABASE_URL="postgresql://user:password@localhost:5432/devtracker"
   # JWT_SECRET="your-secret-key"
   # PORT=5510
   
   # Run database migrations
   npm run migrate
   
   # Seed the database (optional)
   npm run seed
   
   # Start the development server
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../ui
   npm install
   
   # Create a .env file with:
   # VITE_API_URL="http://localhost:5510"
   
   # Start the development server
   npm run dev
   ```

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd api
   npm run dev
   ```
   The API will be available at `http://localhost:5510`

2. **Start the frontend development server**
   ```bash
   cd ui
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📱 Usage

1. **Authentication**
   - Register a new account or log in with existing credentials

2. **Task Management**
   - Create new tasks using the "+" button
   - Edit tasks by clicking the edit icon
   - Delete tasks with confirmation
   - Drag and drop tasks between status columns
   - Filter tasks by status, priority, or search terms

3. **Views**
   - Switch between Board and List views
   - Use dark/light mode toggle
   - View task details by clicking on a task

## 🧪 Testing

```bash
# Run backend tests
cd api
npm test (in progress)

# Run frontend tests
cd ui
npm test (in progress)
```

## 📚 API Documentation (in progress)

The API documentation is available at `/api-docs` when running the backend server. It includes:
- Authentication endpoints
- Task management endpoints
- User management endpoints
- Error codes and responses

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/devtracker
JWT_SECRET=your-secret-key
PORT=3000
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Sashikumar Yadav (@yshashi)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
