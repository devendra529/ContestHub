// client/src/routes/AppRoutes.jsx

import {
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";
import Bookmarks from "../pages/Bookmarks";
import Notes from "../pages/Notes";
import Profile from "../pages/Profile";

import NotFound from "../pages/NotFound";

const AppRoutes = () => {

  return (

    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }
      />

      <Route
        path="/bookmarks"
        element={

          <ProtectedRoute>

            <Bookmarks />

          </ProtectedRoute>

        }
      />

      <Route
        path="/notes"
        element={

          <ProtectedRoute>

            <Notes />

          </ProtectedRoute>

        }
      />

      <Route
        path="/profile"
        element={

          <ProtectedRoute>

            <Profile />

          </ProtectedRoute>

        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );
};

export default AppRoutes;

