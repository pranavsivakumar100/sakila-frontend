import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { actorService, Actor } from '../services/actorService';
import { filmService, Film } from '../services/filmService';
import '../css/ActorDetails.css';

const ActorDetails: React.FC = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const navigate = useNavigate();
  const [actor, setActor] = useState<Actor | null>(null);
  const [topFilms, setTopFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActorDetails = async () => {
      if (!actorId) return;
      
      try {
        setLoading(true);
        const actorData = await actorService.getActorDetails(parseInt(actorId));
        const filmsData = await filmService.searchFilmsByActor(actorData.first_name + ' ' + actorData.last_name);
        setActor(actorData);
        setTopFilms(filmsData.slice(0, 5)); // Get top 5 films
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load actor details');
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  const handleFilmClick = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  if (loading) {
    return <div className="actor-details-loading">Loading actor details...</div>;
  }

  if (error) {
    return (
      <div className="actor-details-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="actor-details-back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="actor-details-error">
        <h2>Actor Not Found</h2>
        <p>The requested actor could not be found.</p>
        <button onClick={() => navigate('/')} className="actor-details-back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="actor-details-container">
      <div className="actor-details-header">
        <button 
          onClick={() => navigate('/')}
          className="actor-details-back-btn"
        >
          ← Back to Home
        </button>
        <h1 className="actor-details-title">{actor.full_name}</h1>
      </div>

      <div className="actor-details-content">
        <div className="actor-details-main">
          <div className="actor-details-info">
            <h2>Actor Information</h2>
            <div className="actor-info-grid">
              <div className="actor-info-item">
                <label>First Name:</label>
                <span>{actor.first_name}</span>
              </div>
              <div className="actor-info-item">
                <label>Last Name:</label>
                <span>{actor.last_name}</span>
              </div>
              <div className="actor-info-item">
                <label>Full Name:</label>
                <span>{actor.full_name}</span>
              </div>
              <div className="actor-info-item">
                <label>Actor ID:</label>
                <span>{actor.actor_id}</span>
              </div>
            </div>
          </div>

          {topFilms.length > 0 && (
            <div className="actor-details-films">
              <h2>Top 5 Rented Films</h2>
              <div className="films-list">
                {topFilms.map((film, index) => (
                  <div 
                    key={film.film_id}
                    onClick={() => handleFilmClick(film.film_id)}
                    className="film-item"
                  >
                    <div className="film-item-content">
                      <div className="film-item-info">
                        <h3>#{index + 1} {film.title}</h3>
                        <p>{film.description.length > 100 ? `${film.description.substring(0, 100)}...` : film.description}</p>
                        <div className="film-item-meta">
                          <span>Year: {film.release_year}</span>
                          <span>Rating: {film.rating}</span>
                          <span>Length: {film.length} min</span>
                        </div>
                      </div>
                      <span className="film-item-rank">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="actor-details-sidebar">
          <div className="actor-details-summary">
            <h3>Actor Summary</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-number">{topFilms.length}</span>
                <span className="stat-label">Films Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{actor.actor_id}</span>
                <span className="stat-label">Actor ID</span>
              </div>
            </div>
          </div>

          <div className="actor-details-actions">
            <h3>Quick Actions</h3>
            <button 
              onClick={() => navigate('/films')}
              className="action-btn primary"
            >
              Browse All Films
            </button>
            <button 
              onClick={() => navigate('/')}
              className="action-btn secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
