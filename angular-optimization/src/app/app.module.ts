import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushModule } from '@rx-angular/template/push';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FibonacciPipe } from './pipe/fibonacci.pipe';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './store/movie/MovieReducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieComponent } from './page/movie/movie.component';
import { HomeComponent } from './page/home/home.component';
import { MovieEffect } from './store/movie/MovieEffects';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { ButtonGroupComponent } from './common/button-group/button-group.component';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    FilterPipe,
    FibonacciPipe,
    MovieComponent,
    HomeComponent,
    ButtonGroupComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PushModule,
    StoreModule.forRoot({movie: movieReducer}, {}),
    EffectsModule.forRoot([ MovieEffect ]),    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
