import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Tours from "./pages/tours/Tours";
import PageNotFound from "./pages/utility/PageNotFound";
import Signin from "./pages/Signin";
import Guides from "./pages/guides/Guides";
import SendNotifications from "./pages/SendNotifications";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreateTour from "./pages/tours/CreateTour";
import ToursDetails from "./pages/tours/ToursDetails";
import GuidesDetails from "./pages/guides/GuidesDetails";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<Signin />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tours"
          element={
            <ProtectedRoute>
              <Tours />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tours/create"
          element={
            <ProtectedRoute>
              <CreateTour />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tours/:id"
          element={
            <ProtectedRoute>
              <ToursDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guides"
          element={
            <ProtectedRoute>
              <Guides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guides/:id"
          element={
            <ProtectedRoute>
              <GuidesDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send-notifications"
          element={
            <ProtectedRoute>
              <SendNotifications />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <PageNotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
