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
      this.getLocation();
      this.getAllGauges();
      this.splash.hide();
	}

	getAllGauges(){
     console.log(this.lat);
	 
  }
  
  getLocation(){
   
    this.geolocation.getCurrentPosition().then((resp) => {
        this.http.get('http://liquidearthlake.org/json/getalldistances/'+resp.coords.latitude+'/'+resp.coords.longitude)
        .subscribe((data : any) =>
        {
          
          console.log(data);
          this.gauges=data;
          
        },
        (error : any) =>
        {
          console.log(error);
        });  
   
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       
       console.log('Error getting location', error);
       this.http.get('http://liquidearthlake.org/json/getalldistances/'+35.9049+'/'+-79.0469)
       .subscribe((data : any) =>
       {
         
         console.log(data);
         this.gauges=data;
         
       },
       (error : any) =>
       {
         console.log(error);
       });  
     });
     
  }
}

