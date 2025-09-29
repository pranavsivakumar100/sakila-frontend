import api from './api';

export interface Film {
    film_id: number;
    title: string;
    description: string;
    release_year: number;
    language_id: number;
    original_language_id: number | null;
    rental_duration: number;
    rental_rate: number;
    length: number;
    replacement_cost: number;
    rating: string;
    special_features: string[];
    last_update: string;
    actors?: Actor[];
    category?: Category;
}

export interface Actor {
actor_id: number;
first_name: string;
last_name: string;
full_name: string;
}

export interface Category {
category_id: number;
name: string;
}

export interface TopFilm {
film_id: number;
title: string;
rentals: number;
}

export const filmService = {
    async getTop5Films(): Promise<TopFilm[]> {
        const response = await api.get('/films/top5');
        return response.data as TopFilm[];
    },

    async getFilmDetails(filmId: number): Promise<Film> {
        const response = await api.get(`/films/${filmId}`);
        return response.data as Film;
    },

    async searchFilmsByTitle(searchTerm: string): Promise<Film[]> {
        const response = await api.get(`/films/search/title?q=${encodeURIComponent(searchTerm)}`);
        return response.data as Film[];
    },

    async searchFilmsByActor(searchTerm: string): Promise<Film[]> {
        const response = await api.get(`/films/search/actor?q=${encodeURIComponent(searchTerm)}`);
        return response.data as Film[];
    },

    async searchFilmsByGenre(searchTerm: string): Promise<Film[]> {
        const response = await api.get(`/films/search/genre?q=${encodeURIComponent(searchTerm)}`);
        return response.data as Film[];
    }
};