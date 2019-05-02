import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  gauges:any;
  lat:any;
  long:any;
	constructor(private http: HttpClient, private splash:SplashScreen,private geolocation:Geolocation){}

	ngOnInit(){
      this.splash.show();
      this.getAllGauges();
      this.splash.hide();
	}

	getAllGauges(){
	   this.http.get('http://liquidearthlake.org/json/getalldistances/'+this.lat+'/'+this.long)
      .subscribe((data : any) =>
      {
        
        console.log(data);
        this.gauges=data;
         
      },
      (error : any) =>
      {
         console.log(error);
      });
  }
  
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       this.lat=35.9049;
       this.long=-79.0469;
       console.log('Error getting location', error);
     });
     
 
  }
}

