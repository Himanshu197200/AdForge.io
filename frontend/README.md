<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Frontend Documentation

## Overview

Modern React application with Material-UI for the Club Event Management System.

## Tech Stack

- **Framework:** React 18
- **UI Library:** Material-UI (MUI) v5
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Charts:** MUI X Charts
- **Date Handling:** date-fns

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout/
│   │       └── Layout.js         # Main layout with navbar
│   ├── context/
│   │   └── AuthContext.js        # Authentication context
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Home/
│   │   │   └── Home.js
│   │   ├── Events/
│   │   │   ├── Events.js
│   │   │   └── EventDetails.js
│   │   ├── Clubs/
│   │   │   ├── Clubs.js
│   │   │   └── ClubDetails.js
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js
│   │   ├── Profile/
│   │   │   └── Profile.js
│   │   ├── Registrations/
│   │   │   └── MyRegistrations.js
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── ManageClubs.js
│   │   │   └── ManageUsers.js
│   │   └── ClubManagement/
│   │       ├── ClubManagement.js
│   │       ├── CreateEvent.js
│   │       └── ManageEvents.js
│   ├── services/
│   │   ├── api.js                # Axios instance
│   │   ├── authService.js
│   │   ├── clubService.js
│   │   ├── eventService.js
│   │   ├── registrationService.js
│   │   └── dashboardService.js
│   ├── App.js                    # Main app component
│   └── index.js                  # Entry point
├── .env.example
├── .gitignore
└── package.json
```

## Key Features

### Authentication
- JWT-based authentication
- Protected routes
- Role-based access control
- Persistent login (localStorage)

### Pages

#### Public Pages
- **Home** - Landing page with featured events and clubs
- **Events** - Browse all events with filters
- **Event Details** - View event information and register
- **Clubs** - Browse all clubs
- **Club Details** - View club information and members
- **Login/Register** - Authentication pages

#### Protected Pages (Student)
- **Dashboard** - Personal statistics and overview
- **Profile** - View and edit profile
- **My Registrations** - View registered events

#### Protected Pages (Core Member)
- **Club Management** - Manage club events
- **Create Event** - Create new events
- **Manage Events** - Edit/delete events

#### Protected Pages (Admin)
- **Admin Dashboard** - System-wide analytics
- **Manage Clubs** - CRUD operations for clubs
- **Manage Users** - User management

### Components

#### Layout Component
- Responsive navbar
- User menu with avatar
- Mobile drawer menu
- Footer
- Nested routing support

#### Protected Route Component
- Authentication check
- Role-based authorization
- Automatic redirect to login

### Services

#### API Service (`api.js`)
```javascript
import api from './services/api';

// Automatically includes JWT token
const response = await api.get('/events');
```

#### Auth Service
```javascript
import { authService } from './services/authService';

// Login
await authService.login(email, password);

// Register
await authService.register(userData);

// Get profile
await authService.getProfile();
```

#### Event Service
```javascript
import { eventService } from './services/eventService';

// Get all events
await eventService.getAllEvents({ status: 'UPCOMING' });

// Get event by ID
await eventService.getEventById(id);

// Create event
await eventService.createEvent(formData);
```

### Context

#### Auth Context
```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}
```

## Material-UI Theme

Custom theme configuration in `index.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
```

## Routing

### Public Routes
- `/` - Home
- `/login` - Login
- `/register` - Register
- `/events` - Events list
- `/events/:id` - Event details
- `/clubs` - Clubs list
- `/clubs/:id` - Club details

### Protected Routes
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/my-registrations` - User's event registrations

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/clubs` - Manage clubs
- `/admin/users` - Manage users

### Core Member Routes
- `/club-management` - Club management
- `/club-management/create-event` - Create event
- `/club-management/events` - Manage events

## State Management

Using React Context API for:
- Authentication state
- User information
- Global app state

## API Integration

### Request Interceptor
Automatically adds JWT token to all requests:
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor
Handles errors and token expiration:
```javascript
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);
```

## Environment Variables

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Access in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

## Running the Application

### Development
```bash
npm start
```
Opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Creates optimized build in `build/` directory

### Run Tests
```bash
npm test
```

## Styling

### Material-UI Components
```javascript
import { Button, TextField, Card } from '@mui/material';

<Button variant="contained" color="primary">
  Click Me
</Button>
```

### Custom Styling
```javascript
<Box sx={{ 
  p: 3,              // padding: 24px
  mt: 2,             // marginTop: 16px
  bgcolor: 'primary.main',
  color: 'white'
}}>
  Content
</Box>
```

### Responsive Design
```javascript
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    {/* Full width on mobile, half on desktop */}
  </Grid>
</Grid>
```

## Best Practices

### Component Structure
```javascript
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch logic
  };

  return (
    <Box>
      <Typography variant="h4">Title</Typography>
      {/* Content */}
    </Box>
  );
};

export default MyComponent;
```

### Error Handling
```javascript
try {
  const response = await eventService.getAllEvents();
  setEvents(response.data);
} catch (error) {
  console.error('Error:', error);
  setError(error.message);
}
```

### Loading States
```javascript
const [loading, setLoading] = useState(true);

if (loading) {
  return <CircularProgress />;
}
```

## Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables in Production
Set `REACT_APP_API_URL` to your production backend URL.

## Performance Optimization

1. **Code Splitting**
   - React.lazy for route-based splitting
   - Dynamic imports

2. **Memoization**
   - Use React.memo for expensive components
   - useMemo and useCallback hooks

3. **Image Optimization**
   - Lazy loading images
   - Proper image formats

4. **Bundle Size**
   - Tree shaking
   - Remove unused dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Issue: CORS Error
**Solution:** Check backend CORS configuration and FRONTEND_URL

### Issue: API calls failing
**Solution:** Verify REACT_APP_API_URL in .env

### Issue: Token expired
**Solution:** Login again to get new token

---

For more information, see the main README.md
>>>>>>> ccd3de8 (updated frontend)
