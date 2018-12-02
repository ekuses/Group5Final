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

  constructor() { }

  ngOnInit() {
    this.newberryMovies = this.moviesService.getNewberryMovies();
    this.celebrationMovies = this.moviesService.getCelebrationMovies();
    this.butlerMovies = this.moviesService.getButlerMovies();
  }

  doShowMovies() {

  }

  doShowTheaters() {
    
  }

}
