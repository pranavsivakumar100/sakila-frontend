import React, { useState } from 'react';
import { filmService, Film } from '../services/filmService';
import { useNavigate } from 'react-router-dom';
import '../css/FilmsPage.css';

const FilmsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'title' | 'actor' | 'genre'>('title');
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let results: Film[] = [];
      switch (searchType) {
        case 'title':
          results = await filmService.searchFilmsByTitle(searchTerm);
          break;
        case 'actor':
          results = await filmService.searchFilmsByActor(searchTerm);
          break;
        case 'genre':
          results = await filmService.searchFilmsByGenre(searchTerm);
          break;
      }
      setSearchResults(results);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFilmClick = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  return (
    <div className="films-container">
      <div className="films-header">
        <h1 className="films-title">Browse Films</h1>
      </div>

      {/* Search Section */}
      <div className="films-search-section">
        <h2 className="films-search-title">Search Films</h2>
        <div className="films-search-controls">
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value as 'title' | 'actor' | 'genre')}
            className="films-search-select"
          >
            <option value="title">By Title</option>
            <option value="actor">By Actor</option>
            <option value="genre">By Genre</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchType}...`}
            className="films-search-input"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="films-search-btn"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <div className="films-error">{error}</div>}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="films-results-section">
          <h2 className="films-results-title">Search Results ({searchResults.length} found)</h2>
          <div className="films-results-grid">
            {searchResults.map((film) => (
              <div 
                key={film.film_id}
                onClick={() => handleFilmClick(film.film_id)}
                className="films-result-card"
              >
                <h3 className="films-result-title">{film.title}</h3>
                <p className="films-result-description">
                  {film.description.length > 100 ? `${film.description.substring(0, 100)}...` : film.description}
                </p>
                <div className="films-result-meta">
                  <span>Year: {film.release_year}</span>
                  <span>Rating: {film.rating}</span>
                  <span>Length: {film.length} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && !loading && searchTerm && (
        <div className="films-no-results">
          <h3>No films found</h3>
          <p>Try adjusting your search term or search type.</p>
        </div>
      )}
    </div>
  );
};

export default FilmsPage;