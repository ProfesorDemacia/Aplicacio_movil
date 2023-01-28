import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _httpClient:HttpClient) { }

  obtenerClima(latitud: number, longitud: number): Observable<any> {
    return this._httpClient.get(`${environment.openweathermap.url}/weather?lat=${latitud}&lon=${longitud}&appid=${environment.openweathermap.apiKey}&units=metric&lang=es`)
  }

  obtenerIcono(icon: any): Observable<any>  {
    return this._httpClient.get(`${environment.openweathermap.urlIcon}/${icon}@4x.png`)
  }
}
