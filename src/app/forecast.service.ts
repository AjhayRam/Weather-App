import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http:HttpClient) { }

  getWeatherForecast(){
    return new Observable((observer)=>{
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          observer.next(position)
        },
        (error)=>{
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any)=>{
        return new HttpParams()
          .set('lon',value.coords.longitude)
          .set('lat',value.coords.latitude)
          .set('units','metric')
          .set('appid','9f9ee9c4f209b2f3fd4eee600b2796dd')
      }),
      switchMap((values)=>{
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast',{params:values })
      })
    )
  }
}
