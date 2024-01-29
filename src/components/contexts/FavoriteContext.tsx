import React, { createContext, FC, ReactNode } from "react";
import { Movie } from "../../types/Movie";

export type FavoriteContextType = {
  addToFavorites: (newMovie: Movie) => {};
  getFavorites: () => Promise<Movie[]>;
  removeFromFavorites: (movieToDelete: Movie) => Promise<Movie[]>;
};

export let movies: Movie[];

const noContextProviderFound = () => {
  throw new Error("No provider for the FavoriteContext found");
};

const contextDefaultValues: FavoriteContextType = {
  addToFavorites: noContextProviderFound,
  getFavorites: noContextProviderFound,
  removeFromFavorites: noContextProviderFound,
};

export const FavoriteContext =
  createContext<FavoriteContextType>(contextDefaultValues);

type FavoriteContextProviderProps = {
  children: ReactNode;
};

const FavoriteContextProvider: FC<FavoriteContextProviderProps> = ({
  children,
}: FavoriteContextProviderProps) => {
  /**
   * This method adds a movie to your favorites list
   * @param movie
   */
  const addToFavorites = async (newMovie: Movie) => {
    movies.push(newMovie);
  };

  /**
   * this method gets you your favorite movies
   * @returns current user
   */
  const getFavorites = async () => {
    return movies;
  };

  /**
   * this method removes movies from your favorites list
   * @returns current user
   */
  const removeFromFavorites = async (movieToDelete: Movie) => {
    movies = movies.filter((movie) => {
      const entries1 = Object.entries(movie);
      const entries2 = Object.entries(movieToDelete);
      if (entries1.length !== entries2.length) {
        return false;
      }

      for (const [key, value] of entries1) {
        if (!entries2.some(([k, v]) => k === key && v === value)) {
          const index = movies.indexOf(movieToDelete);
          if (index !== -1) {
            movies.splice(index, 1);
          }
        }
      }

      return true;
    });
    return movies;
  };

  return (
    <FavoriteContext.Provider
      value={{ addToFavorites, getFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
