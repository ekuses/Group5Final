import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesService = new MoviesService();
  newberryMovies;
  celebrationMovies;
  butlerMovies;
  allMovies;

  showMovies = 'none';
  showTheaters = 'none';
  showOptions = 'block';

  constructor() { }

  ngOnInit() {
    this.newberryMovies = this.moviesService.getNewberryMovies();
    this.celebrationMovies = this.moviesService.getCelebrationMovies();
    this.butlerMovies = this.moviesService.getButlerMovies();
    for(var movie of this.newberryMovies){
      this.
    }
  }

  doShowMovies() {
    this.showOptions = 'none';
    this.showTheaters = 'none';
    this.showMovies = 'block';
    this.allMovies = this.moviesService.getAllMovies();
  }

  doShowTheaters() {
    this.showOptions = 'none';
    this.showMovies = 'none';
    this.showTheaters = 'block';
  }

  doShowOptions() {
    this.showMovies = 'none';
    this.showTheaters = 'none';
    this.showOptions = 'block';
  }

}
