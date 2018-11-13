import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { } from '@types/googlemaps';
import { ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';



export interface Movie {
  name: string;
  time: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  tableshow:boolean;
  moviesDb: Observable<Movie[]>;
  theaterDb: Observable<any[]>;
  showCheckin = "none";
  searchBy = "";
  checkInButler = null;
  checkInCelebration = null;
  checkInRoyalPark = null;
  moviesRef : AngularFirestoreDocument<{test: string}>;
  nameFilter$: BehaviorSubject<string|null>;
  moviesRef2 : AngularFirestoreCollection<Movie>;

  ngOnInit() {
    var mapProp = {
          center: new google.maps.LatLng(29.6436, -82.3749),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.setMarkers(this.map);
  }

  logout() {
  this.afAuth.auth.signOut();
  location.reload();
  }


  constructor(afs: AngularFirestore, public afAuth: AngularFireAuth){
    this.nameFilter$ = new BehaviorSubject(null);
    this.tableshow = true;
    //this.moviesDb = db.collection('movies', ref => ref.where('name', '>=', this.searchBy)).valueChanges();

    this.moviesDb = this.nameFilter$.pipe(
      switchMap((name) =>
        afs.collection<Movie>('movies', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (name) { query = query.where('name', '>=', name) };
          return query;
        }).valueChanges()
      ));




    this.theaterDb = afs.collection('theaters/').valueChanges();
    this.checkInButler = afs.collection('theaters/desc/Butler');
    this.checkInCelebration = afs.collection('theaters/desc/Celebration');
    this.checkInRoyalPark = afs.collection('theaters/desc/RoyalPark');
    this.moviesRef = afs.doc('movies/ex');
  }

  filterByName() {
    this.nameFilter$.next(this.searchBy);
  }



   public showTable(){
    if(this.tableshow){
      this.tableshow = false;
    }else{
      this.tableshow = true;
      }
    }



    public setMarkers(map) {
      var theaters = [
        ["Regal Butler Town Center 14", 29.6272, -82.3772, 3],
        ["Regal Celebration Pointe 10 & RPX", 29.6237, -82.3953, 2],
        ["Regal Cinemas Royal Park 16", 29.6539, -82.3802, 1]
      ];
      for (var i = 0; i < theaters.length; i++) {
        var theater = theaters[i];
        var tstring = String(theater[0]);
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(Number (theater[1]), Number (theater[2])),
          map: map,
          title: tstring,
        });
      }
    }

    showHideCheckin() {
      if (this.showCheckin==="block")
      {
        this.showCheckin="none";
      }
      else
      {
        this.showCheckin="block";
      }
    }

    updateMovies(){
      this.moviesRef.update({test: "1"});
    }

    checkInRoyalParkf(busyValue){
      this.checkInRoyalPark.add({ busy:  busyValue });
    }

    checkInButlerf(busyValue){
      this.checkInButler.add({ busy: busyValue });
    }

    checkInCelebrationf(busyValue){
      this.checkInCelebration.add({ busy:  busyValue  });
    }

}
