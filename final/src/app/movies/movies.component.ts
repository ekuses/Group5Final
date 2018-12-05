import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/movies.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import {FilterPipe} from '../filter.pipe'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService){

  }


  // httpClient;
  //establish the service to fetch movies and times
  // moviesService = new MoviesService(this.httpClient);

  //cinema id's
  newberryID = '42506';
  celebrationID = '64196';
  butlerID = '42490';


  newberry = false;
  celebration = false;
  butler = false;

  //these are all arrays that will be filled with either times or movies

  newberryMoviesArr:any[] = [];
  newberryMovieTimes:any[] = [];
  celebrationMoviesArr:any[] = [];
  celebrationMovieTimes:any[] = [];
  butlerMoviesArr:any[] = [];
  butlerMovieTimes:any[] = [];
  allMoviesArr:any[] = [];
  allMovieTimes:any[] = [];

  //these are going to be used with [ngStyle] to show different parts from the movies
  showMovies = 'none';
  showTheaters = 'none';
  showOptions = 'flex';
  showButler = 'none';
  showNewberry = 'none';
  showCelebration = 'none';

  //Used for busy bar
  butlerAvg = 0;
  butlerBar = "danger";
  celebrationAvg = 0;
  celebrationBar= "";
  royalParkAvg = 0;
  royalParkBar= "";



  ngOnInit() {
    this.moviesService.getTheaterMovies(this.newberryID).subscribe(
      (response) => this.newberryMoviesArr = response.movies
    );
    this.moviesService.getTheaterMovies(this.celebrationID).subscribe(
      (response) => this.celebrationMoviesArr = response.movies
    );
    this.moviesService.getTheaterMovies(this.butlerID).subscribe(
      (response) => this.butlerMoviesArr = response.movies
    ) ;
    this.moviesService.getAllMovies().subscribe(
      (response) => this.allMoviesArr = response.movies
    ) ;

  }
  isToday(showtimes){
    var today:any = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
      dd = '0'+dd
    }
    if(mm<10) {
      mm = '0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    for(var i = showtimes.length - 1; i >= 0; i--) {
      var sliceMe = showtimes[i].start_at;
      var sliceMeAgain = showtimes[i].start_at;
      var showdate = sliceMe.slice(0,10);
      var timeOnly = sliceMeAgain.slice(11,16);
      var hours = timeOnly;
      hours = parseInt(hours.slice(0,2));
      var rest = timeOnly.slice(2,5);

      if (hours > 12){
        hours -= 12;
        timeOnly = hours.toString() + rest +'pm';
      } else {
        timeOnly = hours + rest + 'am';
      }
      if(showdate != today) {
        if(showtimes.length === 1){
          showtimes[0].start_at = 'This movie is not playing today.';
        } else {
          showtimes.splice(i, 1);
        }
      } else {
        showtimes[i].start_at = timeOnly;
      }

    }

    return showtimes;

  }

  doShowMovies() {
    //loop through the movies
    for(var movie of this.allMoviesArr){
      //fetch showtimes
      this.moviesService.getShowtimesFromLocation(movie.id).subscribe(
        (response) => this.allMovieTimes.push(this.isToday(response.showtimes))
      );
    }
    console.log('All Movie Times');
    console.log(this.allMovieTimes);
    console.log('All Movies');
    console.log(this.allMoviesArr);
    console.log('All Butler Movies');
    console.log(this.butlerMoviesArr);
    console.log('All Newberry Movies');
    console.log(this.newberryMoviesArr);
    console.log('All Celebration Movies');
    console.log(this.celebrationMoviesArr);
    console.log('All Butler Times');
    console.log(this.butlerMovieTimes);
    console.log('All Newberry Times');
    console.log(this.newberryMovieTimes);
    console.log('All Celebration Times');
    console.log(this.celebrationMovieTimes);
    this.showOptions = 'none';
    this.showTheaters = 'none';
    this.showMovies = 'block';
  }

  doShowTheaters() {
    this.showOptions = 'none';
    this.showMovies = 'none';
    this.showButler = 'none';
    this.showCelebration = 'none';
    this.showNewberry = 'none';
    this.showTheaters = 'block';
  }

  doShowOptions() {
    this.showMovies = 'none';
    this.showTheaters = 'none';
    this.showOptions = 'flex';
  }

  doShowNewberry(){
    //loop through the movies
    for(var movie of this.newberryMoviesArr){
      //fetch showtimes
      this.moviesService.getShowtimesFromTheater(this.newberryID, movie.id).subscribe(
        (response) => this.newberryMovieTimes.push(this.isToday(response.showtimes))
      );
    }
    this.showTheaters='none';
    this.showNewberry = 'block';
  }
  doShowCelebration(){
    //loop through the movies
    for(var movie of this.celebrationMoviesArr){
      //fetch showtimes
      this.moviesService.getShowtimesFromTheater(this.celebrationID, movie.id).subscribe(
        (response) => this.celebrationMovieTimes.push(this.isToday(response.showtimes))
      );
    }
    this.showTheaters='none';
    this.showCelebration = 'block';
  }

  doShowButler(){
    //loop through the movies
    for(var movie of this.butlerMoviesArr){
      //fetch showtimes
      this.moviesService.getShowtimesFromTheater(this.butlerID, movie.id).subscribe(
        (response) => this.butlerMovieTimes.push(this.isToday(response.showtimes))
      );
    }
    this.showTheaters='none';
    this.showButler = 'block';
  }

  setButlerAvg(avg) {
    this.butlerAvg = avg;
    if (avg >= 4)
    {
      this.butlerBar = "danger";
    }
    else if (avg >= 3)
    {
      this.butlerBar = "warning";
    }
    else
    {
      this.butlerBar = "success";
    }
  }

  setCelebrationAvg(avg) {
    this.celebrationAvg = avg;
    if (avg >= 4)
    {
      this.celebrationBar = "danger";
    }
    else if (avg >= 3)
    {
      this.celebrationBar = "warning";
    }
    else
    {
      this.celebrationBar = "success";
    }
  }

  setRoyalParkAvg(avg) {
    this.royalParkAvg = avg;
    if (avg >= 4)
    {
      this.royalParkBar = "danger";
    }
    else if (avg >= 3)
    {
      this.royalParkBar = "warning";
    }
    else
    {
      this.royalParkBar = "success";
    }
  }

}
