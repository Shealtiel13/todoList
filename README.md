# MERN Stack Todo List Application

A full-stack todo list application built with MongoDB, Express, React, Node.js, and Tailwind CSS. Features user authentication, CRUD operations, and automatic success/failure tracking based on completion timing.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Todo CRUD Operations**: Create, read, update, and delete todos
- **Status Tracking**: Toggle todos between complete and incomplete
- **Success/Failed Labels**:
  - "Success" label for todos completed on or before the due date
  - "Failed" label for incomplete todos past their due date
- **User-Specific Data**: Each user can only see and manage their own todos
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

## Project Structure

```
todoList/
├── backend/                    # Backend API
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers
│   ├── middleware/            # Auth & error middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── utils/                 # Helper functions
│   └── server.js              # Entry point
│
└── frontend/                  # React application
    ├── src/
    │   ├── components/        # React components
    │   ├── pages/             # Page components
    │   ├── services/          # API service layer
    │   ├── context/           # React context
    │   └── utils/             # Helper functions
    └── public/                # Static files
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure environment variables:
The `.env` file is already created with default values. Update if needed:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=mern_todo_secret_key_2026_change_in_production
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

4. Make sure MongoDB is running:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (update MONGO_URI in .env)
```

5. Start the backend server:
```bash
npm run dev
```

The backend API will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure environment variables:
The `.env` file is already created:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## Usage

### 1. Register a New Account
- Navigate to http://localhost:3000
- Click "Register" or "Get Started"
- Fill in username, email, and password (min 6 characters)
- You'll be automatically logged in and redirected to the dashboard

### 2. Login
- Click "Login" from the home page
- Enter your email and password
- You'll be redirected to your dashboard

### 3. Create a Todo
- On the dashboard, fill out the "Create New Todo" form
- Enter a title (required)
- Add a description (optional)
- Select a due date (required)
- Click "Create Todo"

### 4. Manage Todos
- **Mark Complete/Incomplete**: Click the status button to toggle
- **Edit**: Click "Edit" to modify the todo details
- **Delete**: Click "Delete" to remove the todo (with confirmation)

### 5. Success/Failed Labels
- **Success** (green badge): Appears when a todo is completed on or before the due date
- **Failed** (red badge): Appears when a todo is incomplete and past the due date
- **No label**: Shows for incomplete todos not yet due, or completed todos finished after the due date

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Todos
- `GET /api/todos` - Get all user's todos (protected)
- `GET /api/todos/:id` - Get single todo (protected)
- `POST /api/todos` - Create new todo (protected)
- `PUT /api/todos/:id` - Update todo (protected)
- `PATCH /api/todos/:id/status` - Toggle todo status (protected)
- `DELETE /api/todos/:id` - Delete todo (protected)

## Testing

### Manual Testing Checklist

1. **Authentication Flow**
   - [ ] Register with new account
   - [ ] Login with existing account
   - [ ] Logout and verify redirect
   - [ ] Access protected routes without auth (should redirect)

2. **Todo CRUD Operations**
   - [ ] Create a new todo
   - [ ] View all todos
   - [ ] Edit a todo
   - [ ] Delete a todo
   - [ ] Toggle todo status

3. **Success/Failed Labels**
   - [ ] Create todo with past due date (should show "Failed" when incomplete)
   - [ ] Mark it complete (should show "Success" if completed on time)
   - [ ] Create todo with future due date (no label while incomplete)
   - [ ] Complete it before due date (should show "Success")
   - [ ] Complete todo after due date (no label)

4. **User Isolation**
   - [ ] Create todos with user 1
   - [ ] Logout and login as user 2
   - [ ] Verify user 2 cannot see user 1's todos

## Key Implementation Details

### Success/Failed Logic
Located in `frontend/src/utils/todoHelpers.js`:

```javascript
// Failed: status === 'incomplete' AND currentDate >= dueDate
// Success: status === 'complete' AND completedAt <= dueDate
// No label: All other cases
```

### Status Toggle Flow
1. Frontend calls `todoService.toggleTodoStatus(todoId)`
2. Backend toggles status between 'complete' and 'incomplete'
3. If changing to 'complete', sets `completedAt = new Date()`
4. If changing to 'incomplete', sets `completedAt = null`
5. Frontend updates local state with new todo data
6. TodoStatusLabel re-renders with correct label

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in backend/.env
- For MongoDB Atlas, ensure IP whitelist is configured

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: It will prompt you to use a different port (usually 3001)

### CORS Errors
- Ensure FRONTEND_URL in backend/.env matches your frontend URL
- Check that CORS is properly configured in backend/server.js

### Tailwind Styles Not Applying
- Ensure you ran `npm install` in the frontend directory
- Check that tailwind.config.js and postcss.config.js exist
- Verify @tailwind directives are in src/index.css

## Future Enhancements

- Todo categories/tags
- Priority levels (high, medium, low)
- Recurring todos
- Email notifications for upcoming/overdue todos
- Search and filter functionality
- Sort by due date, status, or creation date
- Dark mode
- Export todos to CSV/PDF

## License

MIT

## Author

Created as part of a MERN stack learning project.
