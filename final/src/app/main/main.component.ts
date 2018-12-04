import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MoviesService } from 'src/app/movies.service';
import { getComponentViewByInstance } from '@angular/core/src/render3/context_discovery';

export interface Movie {
  name: string;
  time: string;
}
declare var google;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map;
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
  avgTh = [0,0,0];
  



  ngOnInit() {

    var mapProp = {
          center: new google.maps.LatLng(29.6436, -82.3749),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.getButlerAvg();
        this.getCelebrationAvg();
        this.getRoyalParkAvg();
  }

  logout() {
  this.afAuth.auth.signOut();
  location.reload();
  }


  constructor(afs: AngularFirestore, public afAuth: AngularFireAuth){
    this.nameFilter$ = new BehaviorSubject(null);
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


  }

  filterByName() {
    this.nameFilter$.next(this.searchBy);
  }

  public getButlerAvg()
  {
    const myObserver = {
    next: x => {this.avgTh[0] = 0;
    var i;
    for(i = 0; i < x.length; ++i){
        this.avgTh[0] += Number(x[i].busy);
    }
    this.avgTh[0] = this.avgTh[0] / i;
    this.avgTh[0] = Math.round(this.avgTh[0] * 10) /  10;
    this.setMarkers(this.map);},
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
    };
    this.busyButler.subscribe(myObserver);
  }

  public getCelebrationAvg()
  {
    const myObserver = {
    next: x => {this.avgTh[1] = 0;
    var i;
    for(i = 0; i < x.length; ++i){
        this.avgTh[1] += Number(x[i].busy);
    }
    this.avgTh[1] = this.avgTh[1] / i;
    this.avgTh[1] = Math.round(this.avgTh[1] * 10) /  10;
    this.setMarkers(this.map);},
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
    };
    this.busyCelebration.subscribe(myObserver);
  }

  public getRoyalParkAvg()
  {
    const myObserver = {
    next: x => {this.avgTh[2] = 0;
    var i;
    for(i = 0; i < x.length; ++i){
        this.avgTh[2] += Number(x[i].busy);
    }
    this.avgTh[2] = this.avgTh[2] / i;
    this.avgTh[2] = Math.round(this.avgTh[2] * 10) /  10;
    this.setMarkers(this.map);},
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
    };
    this.busyRoyalPark.subscribe(myObserver);
  }

    public setMarkers(map) {
      var self = this;
      var theaters = [
        ["Regal Butler Town Center 14", 29.6272, -82.3772, 3],
        ["Regal Celebration Pointe 10 & RPX", 29.6237, -82.3953, 2],
        ["Regal Cinemas Royal Park 16", 29.6539, -82.3802, 1]
      ];



      for (var i = 0; i < theaters.length; i++) {
        var theater = theaters[i];
        var avg = this.avgTh[i];
        var content = '<div class="maprow" id="popup" >'+
					'<div id="c1" style="float: left; width: 70%;">'+
						'<h2 style="display: inline-block;">'+theater[0]+' Today\'s busy: '+this.avgTh[i]+'/5</h2>'+
						'<p id=teaTime [value]="tstring">'+theater[1]+'</p>'+
						'<p >graph of busy times for this day?</p>'+
					'</div>'+
					'<div id="c2" value="tstring" style="float: center; width: 30%; display: inline-block;">'+
						'<button type="button" class="btn btn-info btn-block" id="chekin">Check in</button> '+
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

        navigator.geolocation.getCurrentPosition(function(position) {
            var im = 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png';
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
            var marker = new google.maps.Marker({
                map: map,
                position: geolocate,
                //icon: im find the right image
                icon: {
                  fillColor: 'blue',
                  strokeColor: 'blue',
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 5
                }
            });
            
            map.setCenter(geolocate);
            
        });

        google.maps.event.addListener(infowindow, 'domready', function(tstring) {
          document.getElementById("chekin").addEventListener("click", function() {

          var element = document.getElementById("chekin").style.display = "none";
          infowindow.setContent(
          '<div id="pop">'+
           '<div>'+
            '<label for="busyLevel">How busy this Theatre? </label>'+
           '</div>'+
            '<div>'+
              '<select [value] = #busyOption id = "busy" class="" name="busy">'+
                '<option [value]="1">1</option>'+
                '<option [value]="2">2</option>'+
                '<option [value]="3">3</option>'+
                '<option [value]="4">4</option>'+
                '<option [value]="5">5</option>'+
              '</select>'+
            '</div>'+
           '<button type="button" name="closeCheckIn" class="btn btn-info" id="send" >Check In</button>'+
          '</div>'+
          '<div id = "sent" style="display:none">'+
          'Checked In!</div>'
              );
              document.getElementById("send").addEventListener("click", function() {
                  document.getElementById("pop").style.display = "none";
                  document.getElementById("sent").style.display = "block";
              });
          });
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

    public submitCheckin(theatre, busyValue)
    {
      this.showCheckin="none";
      if (theatre.value==="RoyalPark" || theatre.toString() == "(29.6539, -82.3802)")
      {
        this.checkInRoyalParkf(busyValue.value);
      }
      else if (theatre.value==="Butler" || theatre.toString() == "(29.6272, -82.37720000000002)")
      {
        this.checkInButlerf(busyValue.value);
      }
      else if (theatre.value==="Celebration" || theatre.toString() == "(29.6237, -82.39530000000002)")
      {
        this.checkInCelebrationf(busyValue.value);
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
