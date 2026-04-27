import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, CreditCard, Trash2, Loader2, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/bookings/${bookingId}`);
        setBookings(bookings.filter(b => b.id !== bookingId));
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'CONFIRMED': return { color: '#059669', bg: '#ecfdf5', icon: <CheckCircle size={14} /> };
      case 'CANCELLED': return { color: '#dc2626', bg: '#fef2f2', icon: <Trash2 size={14} /> };
      default: return { color: '#d97706', bg: '#fffbeb', icon: <Clock size={14} /> };
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user?.name}!</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your reservations and profile details</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Profile Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Full Name</p>
                <p style={{ fontWeight: 500 }}>{user?.name}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</p>
                <p style={{ fontWeight: 500 }}>{user?.email}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Member Since</p>
                <p style={{ fontWeight: 500 }}>April 2026</p>
              </div>
            </div>
          </div>
        </aside>

        <main>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>My Bookings</h2>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                <Loader2 className="animate-spin" size={32} color="var(--primary)" />
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <Calendar size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <h3>No bookings found</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>You haven't made any reservations yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {bookings.map((booking, index) => {
                  const style = getStatusStyle(booking.status);
                  return (
                    <motion.div 
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ 
                        padding: '1.5rem', 
                        border: '1px solid var(--border)', 
                        borderRadius: 'var(--radius-md)',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: '2rem',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <CreditCard size={32} color="var(--text-muted)" />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <h3 style={{ fontSize: '1.125rem' }}>{booking.room.type} - {booking.room.hotel.name}</h3>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: style.color, 
                            backgroundColor: style.bg,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            {style.icon} {booking.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Calendar size={14} /> {booking.checkInDate} to {booking.checkOutDate}
                          </p>
                          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <MapPin size={14} /> {booking.room.hotel.location}
                          </p>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                          ${booking.room.price}
                        </p>
                        {booking.status !== 'CANCELLED' && (
                          <button 
                            onClick={() => handleCancel(booking.id)}
                            style={{ color: '#dc2626', fontSize: '0.875rem', fontWeight: 600, background: 'none' }}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
