import{ Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MoviesService { 

  newberryMovies;
  newberryMovieTimes;
  celebrationMovies;
  celebrationMovieTimes;
  butlerMovies;
  butlerMovieTimes;
  allMovies;
  allMovieTimes;

  constructor(private httpClient: HttpClient) {}

  //GET NEWBERRY MOVIES ON REQUEST
  getNewberryMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-API-Key': 'LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy'
      })
    };

    this.httpClient.get<any>('https://api.internationalshowtimes.com/v4/movies/?cinema_id=42506', httpOptions)
      .subscribe((data: any) => {
          this.newberryMovies = data;
    });
  }

//GET CELEBRATION MOVIES ON REQUEST
  getCelebrationMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-API-Key': 'LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy'
      })
    };

    this.httpClient.get<any>('https://api.internationalshowtimes.com/v4/movies/?cinema_id=64196', httpOptions)
      .subscribe((data: any) => {
          this.celebrationMovies = data;
    });
  }
//GET BUTLER MOVIES ON REQUEST
  getButlerMovies() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-API-Key': 'LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy'
      })
    };

    this.httpClient.get<any>('https://api.internationalshowtimes.com/v4/movies/?cinema_id=42490', httpOptions)
      .subscribe((data: any) => {
          this.butlerMovies = data;
    });
  }

  getAllMovies(){

  }

  getShowtimesFromTheater(movie_id) {
    //   $.ajax({
    //   url: "https://api.internationalshowtimes.com/v4/movies/?cinema_id=" + movie_id,
    //   type: "GET",
    //   headers: {
    //       "X-API-Key": "LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy",
    //   },
    // })
    // .done(function(data, textStatus, jqXHR) {
    //       console.log("HTTP Request Succeeded: " + jqXHR.status);
    //       console.log(data);
    // })
    // .fail(function(jqXHR, textStatus, errorThrown) {
    //       console.log("HTTP Request Failed");
    // })
  }

  getShowtimesFromLocation(movie_id) {
    //   $.ajax({
    //   url: "https://api.internationalshowtimes.com/v4/movies/?location=29.6436,-82.3749&distance=30&movie_id=" + movie_id,
    //   type: "GET",
    //   headers: {
    //       "X-API-Key": "LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy",
    //   },
    // })
    // .done(function(data, textStatus, jqXHR) {
    //       console.log("HTTP Request Succeeded: " + jqXHR.status);
    //       console.log(data);
    // })
    // .fail(function(jqXHR, textStatus, errorThrown) {
    //       console.log("HTTP Request Failed");
    // })
  }



}