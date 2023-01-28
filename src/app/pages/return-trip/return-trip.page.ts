import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-return-trip',
  templateUrl: './return-trip.page.html',
  styleUrls: ['./return-trip.page.scss'],
})
export class ReturnTripPage implements OnInit {

  userType: string = localStorage?.getItem('userType') || '';
  profile: any = [];

  driversLoading: HTMLIonLoadingElement;
  driversSearchIsDone: boolean = false;
  driversFound: any;
  stopDriversSearch: boolean = true;
  tripRequestCreated: boolean = false;

  timerDrivers: any;
  timerPassengers: any;

  passengersLoading: HTMLIonLoadingElement;
  passengerSearchIsDone: boolean = false;
  passengersFound: any;
  stopPassengersSearch: boolean = true;
  goHomeRequestCreated: boolean = false;

  constructor(private authService: AuthService,
    private tripService: TripService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) {
    this.getUserProfile();
  }

  ngOnInit() {
  }

  getUserProfile() {
    this.authService.getUserProfile().subscribe((respuesta: any) => {
      this.profile = respuesta;
    })
  }

  createGoHomeRequest() {
    this.tripService.insertGoHomeRequest(this.profile).then(() => {
      this.infiniteSearchForPassengers();
      this.searchingPassengersLoading('Buscando pasajeros');
    });
    this.goHomeRequestCreated = true;
  }

  async searchingPassengersLoading(message: string) {
    this.passengersLoading = await this.loadingCtrl.create({
      message,
      spinner: "circular",
    });
    await this.passengersLoading.present();
  }

  infiniteSearchForPassengers() {
    this.timerPassengers = setInterval(() => { this.searchForPassenger(); }, 2000);
    this.stopPassengersSearch = true;
  }

  async searchForPassenger() {
    await this.tripService.passengerTripSearch().then(respuesta => {
      console.log(respuesta);
      this.passengersFound = respuesta;
      this.passengerSearchIsDone = true;
      this.passengersLoading.dismiss();
    },
      (err) => {
        console.log(err);
      });
  }

  stopSearchingPassengers() {
    clearTimeout(this.timerPassengers);
    this.stopPassengersSearch = false;
  }

  async deleteGoHomeRequest() {
    await this.tripService.deleteGoHomeRequest().then(respuesta => {
      clearTimeout(this.timerPassengers);
      this.stopPassengersSearch = true;
      this.tripRequestCreated = false;
      this.passengerSearchIsDone = false;
    })
  }



  //Passagers flow

  initPassengersFlow() {
    this.searchingDriversLoading('Buscando choferes');
    this.infiniteSearchForDrivers();
    this.tripRequestCreated = true;
  }
  async searchForDriver() {
    await this.tripService.searchForCoincidence(this.profile?.commune).then(respuesta => {
      console.log(respuesta);
      this.driversFound = respuesta;
      this.driversSearchIsDone = true;
      this.driversLoading.dismiss();
    },
      (err) => {
        console.log(err);
      });
  }

  infiniteSearchForDrivers() {
    this.timerDrivers = setInterval(() => { this.searchForDriver(); }, 2000);
    this.stopDriversSearch = true;
  }

  stopSearchingDrivers() {
    clearTimeout(this.timerDrivers);
    this.stopDriversSearch = false;
  }

  async chooseDriver(driver: any) {
    await this.tripService.chooseDriverToTravel(driver, this.profile).then(respuesta => {
      this.chosenDriverAlert(driver.name)
    },
      (err) => {
        console.log(err);
      });
  }

  async deleteTripRequest() {
    await this.tripService.deleteTripRequest().then(respuesta => {
      clearTimeout(this.timerDrivers);
      this.stopDriversSearch = true;
      this.goHomeRequestCreated = false;
      this.driversSearchIsDone = false;
    })
  }


  async chosenDriverAlert(driversName: string) {
    const alert = await this.alertController.create({
      header: '¡Chofer elegido!',
      subHeader: 'Nos estamos comunicando con ' + driversName,
      message: 'Pronto el chofer se pondrá en contacto contigo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async searchingDriversLoading(message: string) {
    this.driversLoading = await this.loadingCtrl.create({
      message,
      spinner: "circular",
    });
    await this.driversLoading.present();
  }

}
