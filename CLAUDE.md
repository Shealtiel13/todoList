# CLAUDE.md - Project Context for AI Assistants

This file provides context about the TodoList MERN stack application for AI assistants working on this codebase.

## Project Overview

**MERN Stack Todo Application** with authentication, CRUD operations, and intelligent success/failure tracking based on completion timing. Features a modern dark mode interface built with Tailwind CSS.

**Repository**: https://github.com/Shealtiel13/todoList.git

---

## Technology Stack

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **MongoDB** + **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React** (Create React App)
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling with dark mode
- **Context API** - State management

---

## Project Structure

```
todoList/
├── backend/                          # Express.js API Server
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js         # Authentication logic (register, login)
│   │   └── todoController.js         # Todo CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification middleware
│   │   └── errorMiddleware.js        # Global error handler
│   ├── models/
│   │   ├── User.js                   # User schema with password hashing
│   │   └── Todo.js                   # Todo schema with status tracking
│   ├── routes/
│   │   ├── authRoutes.js             # /api/auth endpoints
│   │   └── todoRoutes.js             # /api/todos endpoints
│   ├── utils/
│   │   └── generateToken.js          # JWT token generation
│   ├── .env                          # Environment variables (NOT in repo)
│   ├── .env.example                  # Environment template
│   ├── package.json                  # Backend dependencies
│   └── server.js                     # Main entry point
│
└── frontend/                         # React Application
    ├── public/                       # Static files
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx         # Login form component
    │   │   │   └── Register.jsx      # Registration form component
    │   │   ├── todos/
    │   │   │   ├── TodoList.jsx      # Main todo list container
    │   │   │   ├── TodoItem.jsx      # Individual todo card
    │   │   │   ├── TodoForm.jsx      # Create/edit todo form
    │   │   │   └── TodoStatusLabel.jsx # Success/Failed badge
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx        # Navigation with dark mode toggle
    │   │   │   └── PrivateRoute.jsx  # Protected route wrapper
    │   │   └── common/
    │   │       ├── Button.jsx        # Reusable button with variants
    │   │       ├── Input.jsx         # Reusable input with dark mode
    │   │       └── Loader.jsx        # Loading spinner
    │   ├── pages/
    │   │   ├── HomePage.jsx          # Landing page
    │   │   ├── LoginPage.jsx         # Login page
    │   │   ├── RegisterPage.jsx      # Registration page
    │   │   └── DashboardPage.jsx     # Todo dashboard (protected)
    │   ├── services/
    │   │   ├── api.js                # Axios instance with interceptors
    │   │   ├── authService.js        # Authentication API calls
    │   │   └── todoService.js        # Todo API calls
    │   ├── context/
    │   │   ├── AuthContext.jsx       # Global auth state
    │   │   └── DarkModeContext.jsx   # Dark mode state & persistence
    │   ├── utils/
    │   │   ├── dateHelpers.js        # Date formatting functions
    │   │   └── todoHelpers.js        # 🎯 Success/Failed label logic
    │   ├── App.js                    # Main app with routing
    │   ├── index.js                  # React entry point
    │   └── index.css                 # Tailwind directives
    ├── .env                          # Environment variables (NOT in repo)
    ├── package.json                  # Frontend dependencies
    ├── tailwind.config.js            # Tailwind configuration
    └── postcss.config.js             # PostCSS configuration
```

---

## Key Architecture Decisions

### 1. Success/Failed Label System (Core Feature)

**Location**: `frontend/src/utils/todoHelpers.js`

**Business Logic**:
- **"Success"** label: Todo marked complete ON OR BEFORE due date
- **"Failed"** label: Todo remains incomplete AFTER due date passes
- **No label**: Incomplete but not yet due, OR completed late

**Implementation**:
```javascript
// When user toggles status to 'complete':
// Backend sets completedAt = new Date() (timestamp)

// Frontend calculates label:
if (status === 'incomplete' && currentDate >= dueDate) {
  return 'failed';
}
if (status === 'complete' && completedAt <= dueDate) {
  return 'success';
}
return null;
```

### 2. Authentication Flow

**JWT Token Based**:
1. User registers/logs in → Backend returns JWT token
2. Frontend stores token in localStorage
3. Axios interceptor attaches token to all requests: `Authorization: Bearer <token>`
4. Backend middleware verifies token on protected routes
5. Token expires after 30 days (configurable in .env)

**Protected Routes**:
- Backend: All `/api/todos/*` endpoints require valid JWT
- Frontend: `/dashboard` route wrapped with `<PrivateRoute>`

### 3. Dark Mode Implementation

**Method**: Class-based dark mode with Tailwind CSS
- State managed in `DarkModeContext`
- Preference persisted in localStorage
- Toggle button in navbar with moon/sun icons
- All components support `dark:` variants

**Tailwind Config**: `darkMode: 'class'` in `tailwind.config.js`

### 4. State Management

**No Redux** - Using React Context API:
- `AuthContext`: User authentication state, login/logout/register methods
- `DarkModeContext`: Dark mode state, toggle method

### 5. Database Schema

**User Model**:
```javascript
{
  username: String (unique, required, min 3 chars),
  email: String (unique, required, validated),
  password: String (hashed with bcrypt, min 6 chars),
  timestamps: true
}
```

**Todo Model**:
```javascript
{
  user: ObjectId (ref: User),
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  dueDate: Date (required),
  status: Enum ['incomplete', 'complete'] (default: 'incomplete'),
  completedAt: Date (null until marked complete),
  timestamps: true
}
```

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

⚠️ **NEVER commit .env files to the repository!**

---

## Common Development Tasks

### Starting the Application

**Terminal 1 - Backend**:
```bash
cd backend
npm install        # First time only
npm run dev        # Start with nodemon
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm install        # First time only
npm start          # Start React dev server
```

**MongoDB**: Must be running (local or Atlas)

### Testing the API

**Register User**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create Todo** (requires token):
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title":"Test Todo","description":"Testing","dueDate":"2026-02-15"}'
```

### Git Operations

**Commit Changes**:
```bash
git add .
git commit -m "Description of changes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push origin main
```

**Create Branch**:
```bash
git checkout -b feature/new-feature
# Make changes
git push -u origin feature/new-feature
```

---

## Security Guidelines

### 🔒 Critical Security Rules

1. **NEVER commit sensitive data**:
   - ❌ `.env` files
   - ❌ JWT secrets
   - ❌ MongoDB connection strings
   - ❌ GitHub Personal Access Tokens
   - ❌ API keys

2. **Password Security**:
   - Always hash passwords with bcrypt (10 salt rounds)
   - Never log or display passwords
   - Enforce minimum 6 characters (configurable)

3. **JWT Best Practices**:
   - Tokens expire (30 days default)
   - Verify on every protected route
   - Use strong secret key (change in production!)

4. **Input Validation**:
   - Backend validates all inputs
   - Frontend validates before sending
   - Sanitize user-provided data

5. **CORS Configuration**:
   - Only allow frontend origin
   - Production: Update `FRONTEND_URL` in .env

---

## Code Patterns & Conventions

### Backend Patterns

**Controller Pattern**:
```javascript
const asyncHandler = require('express-async-handler');

const functionName = asyncHandler(async (req, res) => {
  // Logic here
  res.json({ success: true, data });
});
```

**Error Handling**:
```javascript
if (!valid) {
  res.status(400);
  throw new Error('Error message');
}
```

**Route Protection**:
```javascript
router.get('/protected', protect, controllerFunction);
```

### Frontend Patterns

**API Calls**:
```javascript
import todoService from '../services/todoService';

const fetchData = async () => {
  try {
    const data = await todoService.getTodos();
    setTodos(data);
  } catch (err) {
    setError(err);
  }
};
```

**Context Usage**:
```javascript
import { useAuth } from '../context/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();
```

**Dark Mode Classes**:
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

---

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution**:
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in backend/.env
- For Atlas: Verify IP whitelist

### Issue: JWT Token Invalid
**Solution**:
- Check JWT_SECRET matches on backend
- Token may be expired (check JWT_EXPIRE)
- Clear localStorage and login again

### Issue: CORS Errors
**Solution**:
- Verify FRONTEND_URL in backend/.env
- Check CORS configuration in server.js
- Ensure frontend uses correct API_URL

### Issue: Tailwind Styles Not Working
**Solution**:
- Verify tailwind.config.js exists
- Check @tailwind directives in index.css
- Run `npm install` in frontend/
- Clear cache: `rm -rf node_modules/.cache`

### Issue: Dark Mode Not Persisting
**Solution**:
- Check localStorage in browser DevTools
- Verify DarkModeContext is wrapping App
- Ensure document.documentElement.classList updates

---

## Testing Strategy

### Manual Testing Checklist

**Authentication**:
- [ ] Register with new account
- [ ] Login with existing account
- [ ] Access protected routes (should redirect if not logged in)
- [ ] Logout functionality

**Todo CRUD**:
- [ ] Create todo with all fields
- [ ] View all todos
- [ ] Edit todo
- [ ] Delete todo (with confirmation)
- [ ] Toggle status (complete/incomplete)

**Success/Failed Labels**:
- [ ] Create todo with past due date → Shows "Failed" when incomplete
- [ ] Mark overdue todo complete → No label (late completion)
- [ ] Create todo with future date → No label while incomplete
- [ ] Complete before due date → Shows "Success"

**Dark Mode**:
- [ ] Toggle dark mode in navbar
- [ ] Verify persistence after page refresh
- [ ] Check all pages support dark mode

**User Isolation**:
- [ ] Create todos with user 1
- [ ] Login as user 2
- [ ] Verify user 2 cannot see user 1's todos

---

## Deployment Guidelines

### Backend Deployment (Heroku, Railway, Render)

1. Set environment variables on platform
2. Update FRONTEND_URL to production URL
3. Use MongoDB Atlas for production database
4. Change JWT_SECRET to strong random value
5. Set NODE_ENV=production

### Frontend Deployment (Vercel, Netlify)

1. Build: `npm run build`
2. Set REACT_APP_API_URL to production backend URL
3. Configure redirects for React Router
4. Enable HTTPS

---

## Future Enhancement Ideas

- [ ] Todo categories/tags
- [ ] Priority levels (high, medium, low)
- [ ] Search and filter functionality
- [ ] Recurring todos
- [ ] Email notifications for upcoming/overdue todos
- [ ] Team collaboration (shared todos)
- [ ] Export todos to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Todo attachments
- [ ] Subtasks/checklists

---

## Important Notes for AI Assistants

1. **Success/Failed Logic**: The core feature - never break this logic when refactoring
2. **Security First**: Never commit tokens or secrets
3. **User Isolation**: Always verify todo ownership in backend controllers
4. **Dark Mode**: All new components must support dark mode with Tailwind classes
5. **Error Handling**: Use try-catch in all async operations
6. **Context Pattern**: Prefer Context API over prop drilling
7. **Reusable Components**: Use common components (Button, Input) for consistency

---

## Contact & Resources

- **GitHub**: https://github.com/Shealtiel13/todoList
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

**Last Updated**: 2026-02-06
**Project Version**: 1.0.0
**Maintained By**: Shealtiel13
