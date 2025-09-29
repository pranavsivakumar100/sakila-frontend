import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { filmService, TopFilm } from '../services/filmService';
import { actorService, TopActor } from '../services/actorService';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [topFilms, setTopFilms] = useState<TopFilm[]>([]);
  const [topActors, setTopActors] = useState<TopActor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmsData, actorsData] = await Promise.all([
          filmService.getTop5Films(),
          actorService.getTop5Actors()
        ]);
        setTopFilms(filmsData);
        setTopActors(actorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilmClick = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  const handleActorClick = (actorId: number) => {
    navigate(`/actor/${actorId}`);
  };

  if (loading) {
    return <div className="landing-loading">Loading...</div>;
  }

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h1 className="landing-title">Dashboard</h1>
        <p className="landing-subtitle">Welcome to Sakila Management System</p>
      </div>

      <div className="landing-grid">
        {/* Top 5 Films Section */}
        <div className="landing-section">
          <h2 className="landing-section-title">Top 5 Rented Films</h2>
          <div className="landing-list">
            {topFilms.map((film, index) => (
              <div 
                key={film.film_id}
                onClick={() => handleFilmClick(film.film_id)}
                className="landing-item"
              >
                <div className="landing-item-content">
                  <div className="landing-item-info">
                    <h3>#{index + 1} {film.title}</h3>
                    <p>{film.rentals} rentals</p>
                  </div>
                  <span className="landing-item-rank">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Actors Section */}
        <div className="landing-section">
          <h2 className="landing-section-title">Top 5 Actors in Store</h2>
          <div className="landing-list">
            {topActors.map((actor, index) => (
              <div 
                key={actor.actor_id}
                onClick={() => handleActorClick(actor.actor_id)}
                className="landing-item"
              >
                <div className="landing-item-content">
                  <div className="landing-item-info">
                    <h3>#{index + 1} {actor.first_name} {actor.last_name}</h3>
                    <p>{actor.films_in_store} films in store</p>
                  </div>
                  <span className="landing-item-rank actor">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;