import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './authContext.jsx'; // Import the auth context
import './header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth(); // Get user state and logout function

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">♻️</span>
          <span className="logo-text">WasteReward</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            
            {/* Only show these links if user is authenticated */}
            {user && (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="/upload" 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    Upload Waste
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Auth Buttons - changes based on auth state */}
        <div className="auth-buttons">
          {user ? (
            // Show logout button if user is logged in
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          ) : (
            // Show login/signup if not logged in
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          
          {/* Only show these links if user is authenticated */}
          {user && (
            <>
              <li className="nav-item">
                <NavLink 
                  to="/upload" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Upload Waste
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
          
          <li className="nav-item">
            {user ? (
              <button 
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} 
                className="mobile-logout-btn"
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="mobile-login-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="mobile-register-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}