import createAPI from '../config/api';
import { Movie } from "../types/Movie";
import { MovieValues } from '../types/MovieValues';

const MoviesService = {

  getMovieById: async (movieId: number): Promise<Movie> => {
    const api = await createAPI();
    const { data } = await api.get<Movie>(`/movies/${movieId}`);
    return data;
  },

  getMovie: async () => {
    const api = await createAPI();
    const data = await api.get('/movies');
    return data["data"];
  },

  deleteMovie: async (id: number) => {
    const api = await createAPI();
    const data = await api.delete(`/movies/${id}`);
    console.log(data);
    return data["data"];
  },

  updateMovieById: async (id: number, Movie: Movie) => {
    const api = await createAPI();
    const data = await api.put(`/movies/${id}`, Movie);
    return data["data"];
  },

  addMovie: async (Movie: MovieValues) => {
    const api = await createAPI();
    const data = await api.post(`/movies/`, Movie);
    return data["data"];
  }
};

export default MoviesService;
