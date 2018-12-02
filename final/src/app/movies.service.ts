import { Headers, Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';

export class MoviesService {

  getCelebrationMovies() {
    $.ajax({
      url: "https://api.internationalshowtimes.com/v4/movies/?cinema_id=64196",
      type: "GET",
      headers: {
          "X-API-Key": "LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy",
      },
    })
    .done(function(data, textStatus, jqXHR) {
          console.log("HTTP Request Succeeded: " + jqXHR.status);
          console.log(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
          console.log("HTTP Request Failed");
    })
  }

  getButlerMovies() {
    $.ajax({
      url: "https://api.internationalshowtimes.com/v4/movies/?cinema_id=42490",
      type: "GET",
      headers: {
          "X-API-Key": "LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy",
      },
    })
    .done(function(data, textStatus, jqXHR) {
          console.log("HTTP Request Succeeded: " + jqXHR.status);
          console.log(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
          console.log("HTTP Request Failed");
    })
  }

  getNewberryMovies() {
    $.ajax({
      url: "https://api.internationalshowtimes.com/v4/movies/?cinema_id=42506",
      type: "GET",
      headers: {
          "X-API-Key": "LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy",
      },
    })
    .done(function(data, textStatus, jqXHR) {
          console.log("HTTP Request Succeeded: " + jqXHR.status);
          console.log(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
          console.log("HTTP Request Failed");
    })
  }

  getShowtimes(movie_id) {
    $.ajax({
      url: "https://api.internationalshowtimes.com/v4/movies/?cinema_id=" + movie_id,
      type: "GET",
      headers: {
          "X-API-Key": "LPhMgVoyBrmxG8uePgxCo4FHwJ6CbLdy",
      },
    })
    .done(function(data, textStatus, jqXHR) {
          console.log("HTTP Request Succeeded: " + jqXHR.status);
          console.log(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
          console.log("HTTP Request Failed");
    })
  }



}