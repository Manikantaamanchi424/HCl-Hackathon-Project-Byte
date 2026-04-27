import React from 'react';
import { MapPin, Star, Wifi, Coffee, Wind, Waves } from 'lucide-react';
import { motion } from 'framer-motion';

const HotelCard = ({ hotel, onBook }) => {
  const getAmenityIcon = (amenity) => {
    const a = amenity.toLowerCase();
    if (a.includes('wifi')) return <Wifi size={14} />;
    if (a.includes('pool') || a.includes('beach')) return <Waves size={14} />;
    if (a.includes('breakfast')) return <Coffee size={14} />;
    if (a.includes('gym') || a.includes('spa')) return <Wind size={14} />;
    return null;
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="surface-card"
      style={{ 
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ position: 'relative', height: '200px', backgroundColor: '#e2e8f0' }}>
        {/* Placeholder image logic */}
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          No Image Available
        </div>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--glass)', padding: '0.25rem 0.75rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 600 }}>
          <Star size={14} color="var(--accent)" fill="var(--accent)" /> 4.8
        </div>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{hotel.name}</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <MapPin size={14} /> {hotel.location}
            </p>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {hotel.description}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
          {hotel.amenities.split(',').map((amenity, i) => (
            <span key={i} style={{ 
              fontSize: '0.75rem', 
              backgroundColor: 'var(--background)', 
              padding: '0.25rem 0.6rem', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              {getAmenityIcon(amenity)}
              {amenity.trim()}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>${hotel.rooms?.[0]?.price || '---'}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}> / night</span>
          </div>
          <button 
            onClick={() => onBook(hotel.id)}
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'white', 
              padding: '0.5rem 1.25rem', 
              borderRadius: 'var(--radius-md)',
              fontWeight: 600
            }}
          >
            View Deals
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
