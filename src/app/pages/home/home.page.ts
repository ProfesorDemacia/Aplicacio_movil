import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading : HTMLIonLoadingElement;
  isNotHome = false;
  constructor( private loadingCtrl: LoadingController) { }

  ngOnInit() {
    //this.mostrarLoading('Ingresando a TeLlevoApp');
  }

  mostrarLoading(mensaje: string){
    this.presentarLoading(mensaje);
    setTimeout(() => {
      this.loading.dismiss();
    }, 400);
  }

  async presentarLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();
  }
}
