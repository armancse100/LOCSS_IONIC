import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
import { Platform, NavController, LoadingController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
declare var google;

@Component({
  selector: 'app-gauge-list-map',
  templateUrl: './gauge-list-map.page.html',
  styleUrls: ['./gauge-list-map.page.scss'],
})
export class GaugeListMapPage{

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat:any;
  long:any;
  gauge_data:any;
  error:any;
  loading:any;
  resp:any;

constructor(public loadingcontrl: LoadingController, private splash: SplashScreen, private geolocation: Geolocation, private platform: Platform,private http: HttpClient, private navctrl: NavController, private router: Router) {}

ngOnInit() {
  console.log("Ionview");
  //this.splash.show();
  
  
  this.locate();
  
  this.addMarkerToMap();
  this.loading.dismissAll();
  //this.splash.hide();
  
}


locate(){

 
      //console.log(resp.coords.latitude);
      //this.lat=resp.coords.latitude;
      //this.long=resp.coords.longitude;
      let latLng = new google.maps.LatLng(this.resp.coords.latitude, this.resp.coords.longitude);
      //let latLng = new google.maps.LatLng(36.183670857, -85.507753);
      console.log(this.long);
      
	  let mapOptions = {
        center:latLng,
        // center: {lat: 35.1085, lng:-77.0441},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  



 
}

addMarkerToMap(){
  this.http.get('http://liquidearthlake.org/json/gauges')
      .subscribe((gauges : any) =>
      {
        
        console.log(gauges);
        for(var i=0;i<gauges.length;i++){
          var label = gauges[i].gauge_id+":"+gauges[i].name;
          this.addMarker(Number(gauges[i].latitude),Number(gauges[i].longitude),label,gauges[i].id,gauges[i].name);
          //console.log("success",label);
        }
         
         
      },
      (error : any) =>
      {
         console.log(error);
      });
}

addMarker(lat,lng,label,id,name) {
  var coords = {lat: lat, lng: lng};
  var marker = new google.maps.Marker(
      {
          position: coords,
          map: this.map

      }
  );
  var infoWindow = new google.maps.InfoWindow({
      content: label
  });
  /*marker.addListener("click",function () {
      infoWindow.open(this.map,marker);
  });
  marker.addListener("mouseout",function () {
      infoWindow.close();
  });*/
  console.log('tabs/tab3/'+id+'/'+name);
  marker.addListener('click', ()=> {
    this.router.navigateByUrl('tabs/tab3/'+id+'/'+name);

  });

  

}

}