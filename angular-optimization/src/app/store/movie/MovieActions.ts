import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/model/movie';

export const GET_MOVIES = '[Movie] get items';
export const LOAD_MOVIES = '[Movie] load items';
export const ERROR_ITEM = '[Movie] error item';

export const loadAllMovies = createAction(LOAD_MOVIES, props<{list: Movie[]}>());
export const getAllMovies = createAction(GET_MOVIES);
export const errorMovies = createAction(ERROR_ITEM, props<{error: any}>());
