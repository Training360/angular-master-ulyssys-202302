import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { catchError, Observable, of, switchMap, tap } from "rxjs";
import { MovieService } from "src/app/service/movie.service";
import { ERROR_ITEM, getAllMovies, loadAllMovies, LOAD_MOVIES } from './MovieActions';

@Injectable()
export class MovieEffect {
    getAllMovies$ = createEffect( (): Observable<Action> => {
        return this.actions$.pipe(
            ofType(getAllMovies),
            // withLatestFrom(this.store$),
            // switchMap( ([action, store]) => {
            //     const cache = store.movie.list.length ? store.movie.list : null;
            //     return cache ? of(cache) : this.movieService.getAll();
            // } ),
            switchMap( () => this.movieService.getAll() ),
            switchMap( movies => of({ type: LOAD_MOVIES, list: movies }) ),
            catchError( error => of({ type: ERROR_ITEM, error })),
        );
    });

    constructor(
        private actions$: Actions,
        private movieService: MovieService,
        private store$: Store<any>,
    ) {}
}