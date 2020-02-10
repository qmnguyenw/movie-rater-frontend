import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie;
  @Output() updateMovie = new EventEmitter();
  rateHovered = 0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  rateHover(rate) {
    this.rateHovered = rate;
  }

  rateClicked(rate) {
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      result => this.getDetails(),
      error => console.error()
    );
  }

  // get data for movie detail after rating movie
  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe(
      movie => {
        this.updateMovie.emit(movie);
      },
      error => console.error()
    );
  }

}
