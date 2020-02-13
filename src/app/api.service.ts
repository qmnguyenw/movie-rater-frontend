import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) { }

  // get all movies
  getMovies() {
    return this.httpClient.get<Movie[]>(this.baseMovieUrl, { headers: this.getAuthHeader() });
  }

  // get 1 movie when reload movie details
  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseMovieUrl}${id}/`, { headers: this.getAuthHeader() });
  }

  // create movie
  createMovie(title: string, description: string) {
    const body = JSON.stringify({ title, description });
    return this.httpClient.post(`${this.baseMovieUrl}`, body, { headers: this.getAuthHeader() });
  }

  // edit movie
  editMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({ title, description });
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, { headers: this.getAuthHeader() });
  }

  // delete movie
  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`, { headers: this.getAuthHeader() });
  }

  // rating movie
  rateMovie(rate: number, movieId: number) {
    const body = JSON.stringify({ stars: rate });
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, { headers: this.getAuthHeader() });
  }

  // login user
  loginUser(authData: any) {
    const body = JSON.stringify(authData); // ??? why => solve beaucause of 'authData' is combine of 2 variables username, password
    return this.httpClient.post(`${this.baseUrl}auth/`, body, { headers: this.headers });
  }

  // register user
  registerUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, { headers: this.headers });
  }

  // give header with authentication token
  getAuthHeader() {
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
