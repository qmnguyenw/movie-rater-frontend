import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() selectMovie = new EventEmitter<Movie>();
  @Output() editedMovie = new EventEmitter<Movie>();
  @Output() addedMovie = new EventEmitter();
  @Output() deletedMovie = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit() { }

  movieClicked(movie: Movie) {
    this.selectMovie.emit(movie);
  }

  editMovie(movie: Movie) {
    this.editedMovie.emit(movie);
  }

  addMovie() {
    this.addedMovie.emit();
  }

  deleteMovie(movie: Movie) {
    this.deletedMovie.emit(movie);
  }

}
