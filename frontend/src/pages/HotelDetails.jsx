import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Star, Wifi, Coffee, Wind, Waves, CheckCircle2, Loader2, Calendar, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ type: '', price: '', availability: true });
  const [dates, setDates] = useState({ checkIn: '2026-05-01', checkOut: '2026-05-05' });

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const response = await api.get(`/hotels/${id}`);
      setHotel(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (roomId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      const bookingRequest = {
        checkInDate: dates.checkIn,
        checkOutDate: dates.checkOut,
        status: 'CONFIRMED'
      };
      await api.post(`/bookings/user/${user.id}/room/${roomId}`, bookingRequest);
      alert('Booking successful!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed. Make sure you are authorized.');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/hotels/${id}/rooms`, newRoom);
      alert('Room added successfully!');
      setShowAddRoom(false);
      setNewRoom({ type: '', price: '', availability: true });
      fetchHotel(); // Refresh data
    } catch (error) {
      alert('Failed to add room. Admin privileges required.');
    }
  };

  const isAdmin = user?.roles?.includes('ROLE_ADMIN');

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem' }}><Loader2 className="animate-spin" size={48} /></div>;
  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        <main>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1.5rem' }}>
              <div>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{hotel.name}</h1>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem', color: 'var(--text-muted)' }}>
                  <MapPin size={20} /> {hotel.location}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                   <Star size={20} fill="var(--accent)" color="var(--accent)" /> 4.9 (128 Reviews)
                 </div>
              </div>
            </div>

            <div style={{ height: '400px', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Hotel Gallery Placeholder
            </div>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>Description</h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-main)', lineHeight: 1.8 }}>
                {hotel.description}
              </p>
            </section>

            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>Available Rooms</h2>
                {isAdmin && (
                  <button 
                    onClick={() => setShowAddRoom(!showAddRoom)}
                    style={{ 
                      backgroundColor: showAddRoom ? '#64748b' : 'var(--primary)', 
                      color: 'white', 
                      padding: '0.5rem 1rem', 
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 600
                    }}
                  >
                    {showAddRoom ? <X size={18} /> : <Plus size={18} />}
                    {showAddRoom ? 'Cancel' : 'Add New Room'}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showAddRoom && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden', marginBottom: '2rem' }}
                  >
                    <form onSubmit={handleAddRoom} className="glass-card" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Room Type</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Presidential Suite" 
                          value={newRoom.type}
                          onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                          required
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Price per Night</label>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          value={newRoom.price}
                          onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                          required
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Status</label>
                        <select 
                          value={newRoom.availability}
                          onChange={(e) => setNewRoom({...newRoom, availability: e.target.value === 'true'})}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                        >
                          <option value="true">Available</option>
                          <option value="false">Unavailable</option>
                        </select>
                      </div>
                      <button type="submit" style={{ backgroundColor: '#059669', color: 'white', padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                        Save Room
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {hotel.rooms?.map(room => (
                  <div key={room.id} className="glass-card" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ height: '120px', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}></div>
                    <div>
                      <h3 style={{ marginBottom: '0.5rem' }}>{room.type} Room</h3>
                      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14} /> Free Cancellation</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={14} /> Breakfast Included</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>${room.price}</p>
                      <button 
                        onClick={() => handleBook(room.id)}
                        disabled={bookingLoading}
                        style={{ 
                          backgroundColor: 'var(--primary)', 
                          color: 'white', 
                          padding: '0.75rem 2rem', 
                          borderRadius: 'var(--radius-md)',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {bookingLoading ? <Loader2 className="animate-spin" size={18} /> : 'Book Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        </main>

        <aside>
          <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '120px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Book Your Stay</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Check-in</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="date" 
                    value={dates.checkIn}
                    onChange={(e) => setDates({...dates, checkIn: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Check-out</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="date" 
                    value={dates.checkOut}
                    onChange={(e) => setDates({...dates, checkOut: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                  />
                </div>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-sm)', marginTop: '1rem' }}>
                <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Price per night</span>
                  <span>$---</span>
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.125rem', color: 'var(--secondary)', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                  <span>Total</span>
                  <span>$---</span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HotelDetails;
