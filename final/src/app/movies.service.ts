import{ Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MoviesService { 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-API-Key': 'LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy'
    })
  };

  constructor(private httpClient: HttpClient) {}

  //Get all movies from a specific cinema
  getTheaterMovies(cinema_id) {
    return this.httpClient.get<any>('https://api.internationalshowtimes.com/v4/movies/?cinema_id='+cinema_id, this.httpOptions);
  }

  //Get all movies in GNV
  getAllMovies(){
    return this.httpClient.get<any>('https://api.internationalshowtimes.com/v4/movies/?location=29.6436,-82.3749&distance=30', this.httpOptions);
  }


  getShowtimesFromTheater(cinema_id, movie_id) {

    return this.httpClient.get<any>('https://api.internationalshowtimes.com/v4/showtimes/?cinema_id='+cinema_id+'&movie_id='+movie_id, this.httpOptions);

  }

  //GET ALL SHOWTIMES FOR ALL MOVIES IN GAINESVILLE
  getShowtimesFromLocation(movie_id) {

    return this.httpClient.get<any>('https://api.internationalshowtimes.com/v4/showtimes/?location=29.6436,-82.3749&distance=30&movie_id=' + movie_id, this.httpOptions);

  }



}