import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  coordenadas: any;
  latitud: number;
  longitud: number;
  nameCommune: string;
  weatherInfo: any;
  iconWeather: string;
  weatherStatus: string;
  weatherTemperature: any;

  constructor(
    private _geolocation: GeolocationService,
    private _weather: WeatherService,
    private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.getCoords();
  }

  async getCoords() {
    this.showLoading();
    this.coordenadas = await this._geolocation.getLocation();
    this.setCoords(this.coordenadas);
  }

  async setCoords(coords: any) {
    this.latitud = coords.latitude;
    this.longitud = coords.longitude;

    await this._weather.obtenerClima(this.latitud, this.longitud).subscribe(results => {
      this.weatherInfo = results;
      this.nameCommune = results.name;
      this.iconWeather = results['weather'][0].icon;
      this.weatherStatus = results['weather'][0].description;
      this.weatherTemperature = results.main;
    });
  }

  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 3000,
      spinner: 'circles',
    });

    loading.present();
  }

}
