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
    this.checkInButler = db.collection('theaters/desc/Butler');
    this.checkInCelebration = db.collection('theaters/desc/Celebration');
    this.checkInRoyalPark = db.collection('theaters/desc/RoyalPark');
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
        var content = String(theater[0]); //we can change this to anything including html5
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
        //this.checkInButlerf(busyValue.value);
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
			var xname = document.getElementById('defaultContactFormName');
			var xemail = document.getElementById('defaultContactFormEmail');
			var xtext = document.getElementById('exampleFormControlTextarea2');
			//xname.value = "";
			//xemail.value = "";
			//xtext.value = "";
			var modal = document.getElementById('feedbackform');
			modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
/**
  ******************FIX THIS FUNCTION SOMHOW AND ABOVE COMMENTED CODE**********
  *  window.onclick = function(event) {
	*		var modal = document.getElementById('feedbackform');
	*		if (event.target == modal) {
	*			modal.style.display = "none";
	*		}
	*	}
  */

  //zacs modal stuff

}
