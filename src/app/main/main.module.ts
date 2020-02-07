import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

import { ApiService } from '../api.service';

const routes: Routes = [
  {path: 'movies', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes, ),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    ApiService,
  ]
})
export class MainModule { }
