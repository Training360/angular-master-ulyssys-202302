import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushModule } from '@rx-angular/template/push';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FibonacciPipe } from './pipe/fibonacci.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    FilterPipe,
    FibonacciPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PushModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
