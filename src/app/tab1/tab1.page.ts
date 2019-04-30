import { Component } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  isGeoLocationFound:boolean;
  nearestGauge:string = "BPN2";
  gauges=["Gauge1","Gauge2","Gauge3"];

  constructor (
    private geolocation:Geolocation,
    private alertController:AlertController
    ){}

  ngOnInit(){
    this.getLocation();
    if(!this.isGeoLocationFound){
        this.presentAlertPrompt();
    }
    else{

    }
    //this.getLocation();
  }

  // Get The  Geolocation
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.isGeoLocationFound=true;
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       this.isGeoLocationFound=false;
       console.log('Error getting location', error);
     });
     
  }

  // Present the Add Gauge prompt when geolocaiotn is not found
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Please Enter the Gauge ID',
      inputs: [
        {
          name: 'gauge_name',
          type: 'text',
          placeholder: 'Gauge ID'
        }
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SUBMIT',
          handler: data => {
            this.nearestGauge=data.gauge_name;
            console.log(this.nearestGauge);
          }
        }
      ]
    });
  
    await alert.present();
  }

  onSubmit(form:NgForm){
    console.log(form);
  }
}
