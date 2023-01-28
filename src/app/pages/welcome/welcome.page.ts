import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UsingLocalstorageService } from '../../services/using-localstorage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  username: string;
  gender: string;
  message: string = "Hola";
  loading : HTMLIonLoadingElement;
  userType: string = "";
  
  constructor(private _localStorage: UsingLocalstorageService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.mostrarLoading('Ingresando a TeLlevoApp');
    setTimeout(() => {
      this.setUsername();
      this.setTypeForPicture();
      this.setWelcomeMessage();
    }, 1000);
  }

  setUsername() {
    this.username = this._localStorage.getUsername();
  }

  setWelcomeMessage() {
    this.gender = this._localStorage.getGender();
    if (this.gender == "female") {
      this.message = "Bienvenida " + this.username;
    } 
    else {
      this.message = "Bienvenido " + this.username;
    }
    this.loading.dismiss();
  }

  setTypeForPicture() {
    this.userType = this._localStorage.getUserType();
  }

  mostrarLoading(mensaje: string){
    this.presentarLoading(mensaje);
  }

  async presentarLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();
  }

}
