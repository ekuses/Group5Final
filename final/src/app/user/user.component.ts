import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent{

    items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('movies').valueChanges();
  }
}
