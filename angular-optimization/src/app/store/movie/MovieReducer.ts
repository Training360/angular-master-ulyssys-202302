import { createReducer, createSelector, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { Movie } from 'src/app/model/movie';
import { loadAllMovies, getAllMovies, errorMovies } from './MovieActions';

export interface State {
    list: Movie[],
    error: any,
}

export const initialState: State = {
    list: [],
    error: null,
};

export const movieReducer = createReducer(
  initialState,
  on(loadAllMovies, (state, {list}) => ({...state, list}) ),
  on(errorMovies, (state, {error}) => ({...state, error})),
);

export const selectMovies = (store: any) => store.movie.list;
export const selectMovieError = (store: any) => store.movie.error;
