import './App.css';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import Features from './component/feature';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './component/PasswordProtected'; // Import the protected route component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          
          {/* Landing Page Route */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Features />
              <Login/>
            </>
          } />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard/*" // Adding '*' here in case there are nested routes
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
