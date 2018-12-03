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

  //these are all arrays that will be filled with either times or movies
  newberryMovies;
  newberryMovieTimes;
  celebrationMovies;
  celebrationMovieTimes;
  butlerMovies;
  butlerMovieTimes;
  allMovies;
  allMovieTimes;

  //these are going to be used with [ngStyle] to show different parts from the movies
  showMovies = 'none';
  showTheaters = 'none';
  showOptions = 'block';
  showButler = 'none';
  showNewberry = 'none';
  showCelebration = 'none';

  ngOnInit() {
    this.moviesService.getNewberryMovies();
    this.moviesService.getCelebrationMovies();
    this.moviesService.getButlerMovies() ;
    this.moviesService.getAllMovies();
    // this.moviesService.getMovies(42506).subscribe(
    //   (response) => this.newberryMovies = response
    // );
    // this.moviesService.getMovies(64196).subscribe(
    //   (response) => this.newberryMovies = response
    // );
    // this.moviesService.getMovies(42490).subscribe(
    //   (response) => this.newberryMovies = response
    // );
    // this.moviesService.getAllMovies().subscribe(
    //   (response) => this.allMovies = response
    // );
  }

  doShowMovies() {
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

  doShowButler(){
    this.showTheaters='none';
    this.showButler = 'block';
    console.log(this.moviesService.butlerMovies);
    // for(var movie of this.butlerMovies.movies){
    //   console.log('in the loop!');
    //   //fetch showtime
    //   var newTimes;
    //   this.moviesService.getShowtimesFromTheater(movie.id);
    //   this.butlerMovieTimes.push(newTimes);
    // }
  }

}
