import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {



  ngOnInit() {
  }

    moviesDb: Observable<any[]>;

      theaterDb: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.ass = 0;
    this.moviesDb = db.collection('movies').valueChanges();
    this.theaterDb = db.collection('theaters').valueChanges();
  }



  setAss() {
    this.ass = 1000000;
    }

  }

}
