import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Hotel, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      margin: '1rem', 
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
        <Hotel size={28} />
        <span>StayEase</span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 500 }}>Find Hotels</Link>
        
        {user ? (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500 }}>
              <LayoutDashboard size={18} />
              My Bookings
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ backgroundColor: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>
                  {user.name.charAt(0)}
                </div>
                <span style={{ fontWeight: 600 }}>{user.name}</span>
              </div>
              <button onClick={handleLogout} style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', background: 'none' }}>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" style={{ fontWeight: 500 }}>Login</Link>
            <Link to="/signup" style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'white', 
              padding: '0.5rem 1.25rem', 
              borderRadius: 'var(--radius-md)',
              fontWeight: 600
            }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
