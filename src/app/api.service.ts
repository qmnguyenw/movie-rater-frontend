import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/movies/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token da8ab5b42040aa53a4dc0ae9629eb769f3396383'
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies() {
    return this.httpClient.get(this.baseUrl, {headers: this.headers});
  }
}
