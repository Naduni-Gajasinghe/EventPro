import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EventForm from "./pages/EventForm";
import ProtectedRoute from "./ProtectedRoute";
import Pricing from "./pages/Pricing";
import Feature from "./pages/Feature";
import Demo from "./pages/Demo";
import Profile from "./pages/Profile";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event/:id" element={<EventDetails />} />
        

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
          path="/event/new"
          element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/edit/:id"
          element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;