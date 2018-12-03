import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/movies.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';

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
  showOptions = 'block';
  showButler = 'none';
  showNewberry = 'none';
  showCelebration = 'none';

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

  doShowMovies() {
    //loop through the movies
    for(var movie of this.allMoviesArr){
      //fetch showtimes 
      this.moviesService.getShowtimesFromLocation(movie.id).subscribe(
        (response) => this.allMovieTimes.push(response)
      );
    }
    console.log('All Movie Times');
    console.log(this.allMovieTimes);
    console.log('All Movies');
    console.log(this.allMoviesArr);
    console.log('All Butler Movies');
    console.log(this.butlerMoviesArr);
    console.log('All Newberry Times');
    console.log(this.newberryMoviesArr);
    console.log('All Celebration Times');
    console.log(this.celebrationMoviesArr);
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
    this.showOptions = 'block';
  }

  doShowNewberry(){
    //loop through the movies
    for(var movie of this.newberryMoviesArr){
      //fetch showtimes 
      this.moviesService.getShowtimesFromTheater(this.newberryID, movie.id).subscribe(
        (response) => this.newberryMovieTimes.push(response)
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
        (response) => this.celebrationMovieTimes.push(response)
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
        (response) => this.butlerMovieTimes.push(response)
      );
    }
    this.showTheaters='none';
    this.showButler = 'block';
  }


}
