import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Menu, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import logo from '../assets/logo.jpg';
import './Navbar.css';

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="ClubTyl Logo" className="logo-img" />
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <a href="/#features" className="nav-link">Features</a>
          <a href="/#benefits" className="nav-link">Benefits</a>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4A00E0', fontWeight: 'bold', textDecoration: 'none' }}>
                <User size={20} />
                <span>{user?.Name || user?.user?.name || 'Dashboard'}</span>
              </Link>
              <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn" style={{ padding: '8px 16px', background: 'transparent', color: '#4A00E0', border: '1px solid #4A00E0', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none' }}>
              Login
            </Link>
          )}
          <button className="btn btn-primary">
            <Smartphone size={20} />
            Download App
          </button>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
