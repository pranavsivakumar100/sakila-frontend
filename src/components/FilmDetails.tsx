import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { filmService, Film } from '../services/filmService';
import '../css/FilmDetails.css';

const FilmDetails: React.FC = () => {
  const { filmId } = useParams<{ filmId: string }>();
  const navigate = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFilmDetails = async () => {
      if (!filmId) return;
      
      try {
        setLoading(true);
        const filmData = await filmService.getFilmDetails(parseInt(filmId));
        setFilm(filmData);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load film details');
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [filmId]);

  const handleActorClick = (actorId: number) => {
    navigate(`/actor/${actorId}`);
  };

  if (loading) {
    return <div className="film-details-loading">Loading film details...</div>;
  }

  if (error) {
    return (
      <div className="film-details-error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="film-details-error">
        <h2>Film Not Found</h2>
        <p>The requested film could not be found.</p>
      </div>
    );
  }

  return (
    <div className="film-details-container">
      <div className="film-details-header">
        <h1 className="film-details-title">{film.title}</h1>
      </div>

      <div className="film-details-content">
        <div className="film-details-main">
          <div className="film-details-info">
            <h2>Film Information</h2>
            <div className="film-info-grid">
              <div className="film-info-item">
                <label>Release Year:</label>
                <span>{film.release_year}</span>
              </div>
              <div className="film-info-item">
                <label>Rating:</label>
                <span className={`rating rating-${film.rating.toLowerCase()}`}>{film.rating}</span>
              </div>
              <div className="film-info-item">
                <label>Length:</label>
                <span>{film.length} minutes</span>
              </div>
              <div className="film-info-item">
                <label>Rental Duration:</label>
                <span>{film.rental_duration} days</span>
              </div>
              <div className="film-info-item">
                <label>Rental Rate:</label>
                <span>${film.rental_rate}</span>
              </div>
              <div className="film-info-item">
                <label>Replacement Cost:</label>
                <span>${film.replacement_cost}</span>
              </div>
            </div>
          </div>

          <div className="film-details-description">
            <h2>Description</h2>
            <p>{film.description}</p>
          </div>

          {film.special_features && film.special_features.length > 0 && (
            <div className="film-details-features">
              <h2>Special Features</h2>
              <div className="features-list">
                {film.special_features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="film-details-sidebar">
          {film.category && (
            <div className="film-details-category">
              <h3>Category</h3>
              <div className="category-badge">
                {film.category.name}
              </div>
            </div>
          )}

          {film.actors && film.actors.length > 0 && (
            <div className="film-details-actors">
              <h3>Cast ({film.actors.length})</h3>
              <div className="actors-list">
                {film.actors.map((actor) => (
                  <div 
                    key={actor.actor_id}
                    onClick={() => handleActorClick(actor.actor_id)}
                    className="actor-item"
                  >
                    <span className="actor-name">{actor.full_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
