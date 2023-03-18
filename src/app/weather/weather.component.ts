import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  lat:any; 
  lon:any;
  weather :any;
 
  constructor(private weatherService: WeatherService){}
  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=>{
        this.lat=success.coords.latitude;
        this.lon=success.coords.longitude;

        this.weatherService.getweatherDataByCoords(this.lat, this.lon).subscribe(data=>{
          this.weather = data;
        })
      })
    }
  }

  getCity(city: string){
    this.weatherService.getWeatherDataByCityName(city).subscribe(data=>{
      this.weather=data
      
    })
  }

  
}

