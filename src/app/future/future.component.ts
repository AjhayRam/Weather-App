import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent implements OnInit{
  weatherData:any = [];
  forecastDetails:any;
  
  primaryDisplay=true;
  secondaryDisplay=false;


  constructor(private forecastService:ForecastService){}
  ngOnInit(): void {
    this.forecastService.getWeatherForecast().pipe(
      pluck('list')
    )
    .subscribe(data=>{
      this.futureForecast(data)
    })
  }

  futureForecast(data:any){
    for(let i=0; i<data.length; i=i+8){
      this.weatherData.push(data[i]);
    }
    console.log(this.weatherData);
  }

  // toggle(){
  //   this.primaryDisplay = !this.primaryDisplay;
  //   this.secondaryDisplay = !this.secondaryDisplay;

  
  // }

  // showDetails(data:any){
  //   this.forecastDetails= data;
    
  // }
  
}
