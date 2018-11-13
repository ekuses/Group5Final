import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { } from '@types/googlemaps';
import { ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  tableshow:boolean;
  moviesDb: Observable<any[]>;
  theaterDb: Observable<any[]>;
  showCheckin = "none";
  searchBy = "";
  checkInButler = null;
  checkInCelebration = null;
  checkInRoyalPark = null;

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


  constructor(db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.tableshow = true;
    this.moviesDb = db.collection('movies', ref => ref.where('name', '>=', this.searchBy)).valueChanges();
    this.theaterDb = db.collection('theaters').valueChanges();
    this.checkInButler = db.collection('theaters/Butler');
    this.checkInCelebration = db.collection('theaters/Celebration');
    this.checkInRoyalPark = db.collection('theaters/RoyalPark');
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

    checkInRoyalParkf(busyValue){
      this.checkInRoyalPark.add({ name: 'busy', value: busyValue });
    }

    checkInButlerf(){
      this.checkInButler.add({ name: 'busy', value: busyValue });
    }

    checkInCelebrationf(){
      this.checkInCelebration.add({ 'busy':  busyValue, date:  });
    }

}
