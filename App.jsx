import './App.css';
import Navbar from './components/shared/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute'; // ✅ NEW import
import Roadmaps from './components/Roadmaps';
import SavedJobs from './components/SavedJobs';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Status from './components/Status';
import Resumes from './components/Resumes';

const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  // ✅ Protected routes (user must be logged in)
  {
    path: '/jobs',
    element: <PrivateRoute><Jobs /></PrivateRoute>
  },
  {
    path: '/description/:id',
    element: <PrivateRoute><JobDescription /></PrivateRoute>
  },
  {
    path: '/browse',
    element: <PrivateRoute><Browse /></PrivateRoute>
  },
  {
    path: '/profile',
    element: <PrivateRoute><Profile /></PrivateRoute>
  },
  {
    path: '/roadmaps',
    element: <PrivateRoute><Roadmaps /></PrivateRoute>
  },
  {
    path: '/saved-jobs',
    element: <PrivateRoute><SavedJobs /></PrivateRoute>
  },

  // ✅ Admin protected routes
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />
  },
  {
    path: '/admin/jobs/create',
    element: <PostJob />
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <Applicants />
  },
  {path:'/status',
    element:<Status/>
  },
  {
    path:'/resumes',
    element:<Resumes/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
