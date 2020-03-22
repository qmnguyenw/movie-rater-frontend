import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../models/movie';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: Movie[] = [];
  selectedMovie: Movie = null;
  editMovie = null;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  // on start check authentication before show
  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    // redirect login if not login
    if (!mrToken) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getMovies().subscribe(
        (data: Movie[]) => {
          this.movies = data;
        },
        error => console.log(error)
      );
    }
  }

  // logout function
  logout() {
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth']);
  }

  // click choose 1 movie in list
  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.editMovie = null;
  }

  // click edit 1 movie
  editedMovie(movie: Movie) {
    this.selectedMovie = null;
    this.editMovie = movie;
  }

  // click add movie
  addMovie() {
    this.selectedMovie = null;
    this.editMovie = { title: '', description: '' };
  }

  // click delete movie
  deletedMovie(movie: Movie) {
    this.apiService.deleteMovie(movie.id).subscribe(
      data => {
        this.movies = this.movies.filter(mov => mov.id !== movie.id);
      },
      error => console.log(error)
    );
  }

  // after add movie
  movieCreated(movie: Movie) {
    this.movies.push(movie);
    this.editMovie = null; // add more to disappear edit panel
  }

  // after edit movie
  movieUpdated(movie: Movie) {
    const index = this.movies.findIndex(mov => mov.id === movie.id);
    if (index >= 0) {
      this.movies[index] = movie;
    }
    this.editMovie = null; // add more to disappear edit panel
  }
}
