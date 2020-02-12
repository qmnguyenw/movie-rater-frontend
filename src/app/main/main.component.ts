import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../models/movie';

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
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      error => console.log(error)
    );
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.editMovie = null;
  }

  editedMovie(movie: Movie) {
    this.selectedMovie = null;
    this.editMovie = movie;
  }

  addMovie() {
    this.selectedMovie = null;
    this.editMovie = {title: '', description: ''};
  }

  deletedMovie(movie: Movie) {
    this.apiService.deleteMovie(movie.id).subscribe(
      data => {
        this.movies = this.movies.filter(mov => mov.id !== movie.id);
      },
      error => console.log(error)
    );
  }

  movieCreated(movie: Movie) {
    this.movies.push(movie);
    this.editMovie = null; // add more to disappear edit panel
  }

  movieUpdated(movie: Movie) {
    const index = this.movies.findIndex(mov => mov.id === movie.id);
    if (index >= 0) {
      this.movies[index] = movie;
    }
    this.editMovie = null; // add more to disappear edit panel
  }
}
