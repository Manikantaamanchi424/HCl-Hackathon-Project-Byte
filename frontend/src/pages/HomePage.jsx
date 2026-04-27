import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import { motion } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddHotelModal from '../components/AddHotelModal';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes('ROLE_ADMIN');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async (location = '') => {
    setLoading(true);
    try {
      const url = location ? `/hotels/search?location=${location}` : '/hotels';
      const response = await api.get(url);
      setHotels(response.data);
    } catch (err) {
      setError('Failed to fetch hotels. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section style={{ 
        height: '400px', 
        backgroundColor: 'var(--secondary)', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 1.5rem'
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}
        >
          Find Your Perfect Stay
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px' }}
        >
          Book luxury hotels and cozy stays at the best prices. Your next adventure starts here.
        </motion.p>
      </section>

      <div className="container">
        <SearchBar onSearch={fetchHotels} />

        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Available Hotels ({hotels.length})</h2>
            {isAdmin && (
              <button 
                onClick={() => setShowAddHotel(true)}
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: 'white', 
                  padding: '0.6rem 1.25rem', 
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600
                }}
              >
                <Plus size={18} /> Add New Hotel
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'red' }}>{error}</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {hotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} onBook={(id) => navigate(`/hotel/${id}`)} />
              ))}
            </div>
          )}
          
          {!loading && hotels.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
              <h3>No hotels found in this location.</h3>
              <p>Try searching for another city or browse all hotels.</p>
              <button onClick={() => fetchHotels()} style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '1rem' }}>Show All Hotels</button>
            </div>
          )}
        </div>
      </div>

      <AddHotelModal 
        isOpen={showAddHotel} 
        onClose={() => setShowAddHotel(false)} 
        onSuccess={fetchHotels} 
      />
    </div>
  );
};

export default HomePage;
