import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location);
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem', maxWidth: '900px', margin: '-4rem auto 3rem', position: 'relative', zIndex: 10 }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.5fr', gap: '1rem', alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={16} /> Destination
          </label>
          <input 
            type="text" 
            placeholder="Where are you going?" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} /> Check-in
          </label>
          <input 
            type="date" 
            style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} /> Check-out
          </label>
          <input 
            type="date" 
            style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', width: '100%' }}
          />
        </div>

        <button type="submit" style={{ 
          backgroundColor: 'var(--primary)', 
          color: 'white', 
          padding: '0.75rem', 
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
