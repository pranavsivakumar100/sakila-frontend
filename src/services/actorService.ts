import api from './api';

export interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
}

export interface TopActor {
  actor_id: number;
  first_name: string;
  last_name: string;
  films_in_store: number;
}

export const actorService = {
  async getTop5Actors(): Promise<TopActor[]> {
    const response = await api.get('/actors/top5');
    return response.data as TopActor[];
  },

  async getActorDetails(actorId: number): Promise<Actor> {
    const response = await api.get(`/actors/${actorId}`);
    return response.data as Actor;
  }
};