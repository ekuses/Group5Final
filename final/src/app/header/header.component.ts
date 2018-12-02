import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameFilter$: BehaviorSubject<string|null>;
  searchBy = "";
  showCheckin="none";

  constructor(afs: AngularFirestore, public afAuth: AngularFireAuth) { 
    this.nameFilter$ = new BehaviorSubject(null);
  }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
    location.reload();
  }

  checkIn() {
    this.showCheckin="block";
  }
  hideCheckIn()
  {
    this.showCheckin="none";
  }

}
