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
  busyButler : Observable<any[]>;
  busyCelebration : Observable<any[]>;
  busyRoyalPark : Observable<any[]>;
  moviesRef : AngularFirestoreDocument<{test: string}>;
  nameFilter$: BehaviorSubject<string|null>;
  moviesRef2 : AngularFirestoreCollection<Movie>;
  busyAvg = 0;


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
    this.busyButler = afs.collection('theaters/desc/Butler').valueChanges();
    this.busyCelebration = afs.collection('theaters/desc/Celebration').valueChanges();
    this.busyRoyalPark = afs.collection('theaters/desc/RoyalPark').valueChanges();

    this.getAverageOfBusy();

  }

  filterByName() {
    this.nameFilter$.next(this.searchBy);
  }

  public getAverageOfBusy()
  {
    const myObserver = {
    next: x => {this.busyAvg = 0;
    var i;
    for(i = 0; i < x.length; ++i){
        this.busyAvg += Number(x[i].busy);
    }
    this.busyAvg = this.busyAvg / i;
    console.log(this.busyAvg);},
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
    };
    this.busyButler.subscribe(myObserver);
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
        var content = '<div class="maprow" id="popup" >'+
					'<div id="c1" style="float: left; width: 70%;">'+
						'<h2 style="display: inline-block;">'+theater[0]+' ['+theater[4]+']</h2>'+
						'<p >'+theater[1]+'</p>'+
						'<p >graph of busy times for this day?</p>'+
					'</div>'+
					'<div id="c2" style="float: center; width: 30%; display: inline-block;">'+
						'<button type="button" class="btn btn-info btn-block" >Check in</button> '+
						'<button type="button" class="btn btn-info btn-block" >Showtimes</button> '+
						'<button type="button" class="btn btn-info btn-block" >Navigate</button> '+
					'</div>'+
				'</div>' ; //String(theater[0]); //we can change this to anything including html5
        var tstring = String(theater[0]);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(Number (theater[1]), Number (theater[2])),
          map: map,
          title: tstring,
        });
        google.maps.event.addListener(marker, 'click', function(content){
          return function(){
            infowindow.setContent(content);
            infowindow.open(map, this);
          }
        }(content));
      }
    }

    checkIn() {
      this.showCheckin="block";
    }


    hideCheckIn()
    {
      this.showCheckin="none";
    }

    public checkInRoyalParkf(busyValue){
      this.checkInRoyalPark.add({ busy:  busyValue });
    }

    public checkInButlerf(busyValue){
      this.checkInButler.add({ busy: busyValue });
    }

    public checkInCelebrationf(busyValue){
      this.checkInCelebration.add({ busy:  busyValue  });
    }

    submitCheckin(theatre, busyValue)
    {
      this.showCheckin="none";
      if (theatre.value==="RoyalPark")
      {
        //this.checkInRoyalParkf(busyValue.value);
      }
      else if (theatre.value==="Butler")
      {
        this.checkInButlerf(busyValue.value);
      }
      else if (theatre.value==="Celebration")
      {
        //this.checkInCelebrationf(busyValue.value);
      }
    }

    //zacs modal stuff

		showfeedback() {
		  var x = document.getElementById('feedbackform');
		  x.style.display = "block";
		}
		hidefeedback() {
			var modal = document.getElementById('feedbackform');
			modal.style.display = "none";
		}
		sendfeedback() {
//			var xname = document.getElementById('defaultContactFormName');
//			var xemail = document.getElementById('defaultContactFormEmail');
//			var xtext = document.getElementById('exampleFormControlTextarea2');
//			xname.setAttribute("value", "");
//			xemail.setAttribute("value", "");
//			xtext.setAttribute("value", "");
			var modal = document.getElementById('feedbackform');
			modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it

  //zacs modal stuff

}
