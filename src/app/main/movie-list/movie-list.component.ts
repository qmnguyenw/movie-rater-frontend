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

  // send mouse click event to main
  movieClicked(movie: Movie) {
    this.selectMovie.emit(movie);
  }

  // send click edit event to main
  editMovie(movie: Movie) {
    this.editedMovie.emit(movie);
  }

  // send click add event to main
  addMovie() {
    this.addedMovie.emit();
  }

  // send click delete event to main
  deleteMovie(movie: Movie) {
    this.deletedMovie.emit(movie);
  }

}
