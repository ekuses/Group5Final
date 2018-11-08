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
    tableshow: boolean;

    this.moviesDb = db.collection('movies').valueChanges();
    this.theaterDb = db.collection('theaters').valueChanges();
  }
    showTable(){
    if(this.tableshow)
      this.tableshow = false;
    else
        this.tableshow = true;
  }
}
