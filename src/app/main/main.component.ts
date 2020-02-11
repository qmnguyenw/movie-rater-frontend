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
    // this.selectedMovie = null;
    this.editMovie = {title: '', description: ''};
  }

  deletedMovie(movie: Movie) {
    // TODO remove movie with API
    console.log('delete', movie.title);
  }
}
