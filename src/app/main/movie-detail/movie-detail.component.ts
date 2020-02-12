import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter<Movie>();
  rateHovered = 0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  rateHover(rate: number) {
    this.rateHovered = rate;
  }

  rateClicked(rate: number) {
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      result => this.getDetails(),
      error => console.error()
    );
  }

  // update data of movie detail after rating movie
  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
      },
      error => console.error()
    );
  }

}
