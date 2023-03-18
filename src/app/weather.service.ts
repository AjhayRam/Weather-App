import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url='https://api.openweathermap.org/data/2.5/weather';
  apiKey = '9f9ee9c4f209b2f3fd4eee600b2796dd';
  constructor(private http:HttpClient) { }

  
getweatherDataByCoords(lat: any  , lon: any ){
  let params = new HttpParams()
  .set('lat', lat)
  .set('lon', lon)
  .set('units', 'metric')
  .set('appid', this.apiKey)


  return this.http.get(this.url, {params });
}

getWeatherDataByCityName(city:string){
  let params = new HttpParams()
  .set('q',city)
  .set('units','metric')
  .set('appid',this.apiKey)

  return this.http.get(this.url, {params });
}
}

