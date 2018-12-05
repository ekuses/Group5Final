import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MoviesService } from 'src/app/movies.service';
import { getComponentViewByInstance } from '@angular/core/src/render3/context_discovery';
import { MoviesComponent } from '../movies/movies.component';

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

export class MainComponent implements OnInit, AfterViewInit  {
  @ViewChild(MoviesComponent)
  private moviesComp: MoviesComponent;
  @ViewChild('gmap') gmapElement: any;
  map;
  moviesDb: Observable<Movie[]>;
  theaterDb: Observable<any[]>;
  showCheckin = "none";
  searchBy = "";
  checkInButler = null;
  checkInCelebration = null;
  checkInRoyalPark = null;
  feedBackRef = null;
  busyButler : Observable<any[]>;
  busyCelebration : Observable<any[]>;
  busyRoyalPark : Observable<any[]>;
  moviesRef : AngularFirestoreDocument<{test: string}>;
  nameFilter$: BehaviorSubject<string|null>;
  moviesRef2 : AngularFirestoreCollection<Movie>;
  avgTh = [0,0,0];


  ngAfterViewInit() {
    //this.MoviesComponent = this.childReference.exampleChild;
  }


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
    this.feedBackRef =  afs.collection('feedback/');
    this.moviesRef = afs.doc('movies/ex');
    this.busyButler = afs.collection('theaters/desc/Butler', ref => ref.where('date', '>=', (Date.now() - 86400000))).valueChanges();
    this.busyCelebration = afs.collection('theaters/desc/Celebration', ref => ref.where('date', '>=', (Date.now() - 86400000))).valueChanges();
    this.busyRoyalPark = afs.collection('theaters/desc/RoyalPark', ref => ref.where('date', '>=', (Date.now() - 86400000))).valueChanges();


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
    if (this.avgTh[0] != 0)
    {
    this.avgTh[0] = this.avgTh[0] / i;
    this.avgTh[0] = Math.round(this.avgTh[0] * 10) /  10;
    }
    this.moviesComp.setButlerAvg(this.avgTh[0]);
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
    if (this.avgTh[1] != 0)
    {
    this.avgTh[1] = this.avgTh[1] / i;
    this.avgTh[1] = Math.round(this.avgTh[1] * 10) /  10;
    }
    this.moviesComp.setCelebrationAvg(this.avgTh[1]);
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
    if (this.avgTh[2] != 0)
    {
    this.avgTh[2] = this.avgTh[2] / i;
    this.avgTh[2] = Math.round(this.avgTh[2] * 10) /  10;
    }
    this.moviesComp.setRoyalParkAvg(this.avgTh[2]);
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

        //Code used to determine color of busy bar
        var barColor= "";
        if (avg >= 4)
        {
          barColor = "bg-danger";
        }
        else if (avg >= 3)
        {
          barColor = "bg-warning";
        }
        else
        {
          barColor = "bg-success";
        }

        var content = '<div class="maprow" id="popup" >'+
					'<div id="c1" style="float: left; width: 70%;">'+
						'<h2 style="display: inline-block;">'+theater[0]+'</h2>'+
            '<h4>Today\'s busy level:</h4>'+
            '<div class="progress">' +
              '<div class="progress-bar '+barColor+ '" role="progressbar" aria-valuenow="' + this.avgTh[i]*20+ '"aria-valuemin="0" aria-valuemax="100" style="width:'+(this.avgTh[i]-1)*25+'%">' +
                this.avgTh[i]+
              '</div>' +
            '</div>' +
					'</div>'+
					'<div id="c2" value="tstring" style="float: center; width: 30%; display: inline-block;">'+
						'<button type="button" class="btn btn-info btn-block" id="chekin">Check in</button> '+
						'<button type="button" class="btn btn-info btn-block" id = "showtimez">Showtimes</button> '+
						'<button type="button" class="btn btn-info btn-block" id="navigate">Navigate</button> '+
					'</div>'+
				'</div>' ; //String(theater[0]); //we can change this to anything including html5
        var tstring = String(theater[0]);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(Number (theater[1]), Number (theater[2])),
          map: map,
          title: tstring,
        } );

        var myloc = 0;

        navigator.geolocation.getCurrentPosition(function(position) {
            var im = 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png';
            var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            myloc = geolocate;
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

          document.getElementById("showtimez").addEventListener("click", function() {

            self.moviesComp.doShowTheaters();



            if (infowindow.position.toString() == "(29.6539, -82.3802)")
            {
              self.moviesComp.doShowNewberry();
            }
            else if (infowindow.position.toString() == "(29.6272, -82.37720000000002)")
            {
              self.moviesComp.doShowButler();
            }
            else if (infowindow.position.toString() == "(29.6237, -82.39530000000002)")
            {
              self.moviesComp.doShowCelebration();
            }
          });
        });
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;
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
                  self.submitCheckin(infowindow.position, document.getElementById("busy"));
              });
          });


          document.getElementById("navigate").addEventListener("click", function() {

            directionsService.route({
                origin: myloc,
                destination: infowindow.position,
                travelMode: 'DRIVING'
            },function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap(map);
                    infowindow.setContent('<button type="button" name="hideDir" class="btn btn-info" id="hideDir" >Hide Directions</button>');
                    document.getElementById("hideDir").addEventListener("click", function() {
                      directionsDisplay.setMap(null);
                      infowindow.close();
                    });
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

          });

      });

        google.maps.event.addListener(marker, 'click', function(content){
          return function(){
           directionsDisplay.setMap(null);

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

    public feedBackDb(name,email,subject,info){
      this.feedBackRef.add({ name:  name, email: email, subject: subject, info: info, date: Date.now() });
      this.hidefeedback();
    }

    public checkInRoyalParkf(busyValue){
      this.checkInRoyalPark.add({ busy:  busyValue, date: Date.now() });
    }

    public checkInButlerf(busyValue){
      this.checkInButler.add({ busy: busyValue, date: Date.now()  });
    }

    public checkInCelebrationf(busyValue){
      this.checkInCelebration.add({ busy:  busyValue, date: Date.now()   });
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
		public hidefeedback() {
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
