import { Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  isGeoLocationFound:boolean;
  nearestGauge:any;
  nearestGaugeID:string;
  nearestGaugeIncID:number;
  gauges=[];
  date:any;
  time:any;
  isBubbleLevelOkay:string;

  constructor (
    private geolocation:Geolocation,
    private alertController:AlertController,
    private http:HttpClient,
    private router:Router
    ){}

  ngOnInit(){
    
    this.getCurrentDateTime()
    this.getAllGauges();
    this.getLocation();
    if(!this.isGeoLocationFound){
        this.presentAlertPrompt();
    }
    else{

    }
    //this.getLocation();
  }

  getCurrentDateTime(){
      let date = new Date();
      this.date=moment().format('YYYY-MM-DD');
      this.time=moment().format('HH:mm');
      this.isBubbleLevelOkay="Yes";
      console.log(this.date);
      console.log(this.time);
  }

  // Get The  Geolocation
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.isGeoLocationFound=true;
      this.http.get('http://liquidearthlake.org/json/getnearestgauge/'+resp.coords.latitude+'/'+resp.coords.longitude)
      .subscribe((data : any) =>
      {
       // console.log(data);
        this.nearestGauge=data;
        this.nearestGaugeID=data.gauge_id;
        this.nearestGaugeIncID=data.id;
        console.log(this.nearestGaugeIncID);
        
      },
      (error : any) =>
      {
        console.log(error);
      });
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
          name: 'gauge_id',
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
            this.nearestGaugeID=data.gauge_id;
            console.log(this.nearestGaugeID);
          }
        }
      ]
    });
  
    await alert.present();
  }

  getAllGauges(){
    this.http.get('http://liquidearthlake.org/json/gauges')
    .subscribe((data : any) =>
    {
      
    
      this.gauges=data;
      console.log(data);
      
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  onSubmit(form:NgForm){
    this.nearestGauge= this.gauges.filter(m => m.id == form.value['gauge_inc_id']);
    console.log(form);
    this.http.post("http://liquidearthlake.org/json/reading/store", form.value)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
    console.log(this.gauges);
    
    console.log(this.nearestGauge[0].gauge_id);
    this.router.navigateByUrl('tabs/tab3/'+form.value['gauge_inc_id']+'/'+this.nearestGauge[0].gauge_id);
  }

 
}
