import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {


  title = 'Nuestro Equipo';
  busqueda: string = "";


  listaEquipo: any = [{
    id: 0,
    name: '',
    puesto: '',
    image: '',
    description: ''
  },];


  constructor(private navCtrl: NavController) { 
    this.listaEquipo = [
      {
        id: 1,
        name: 'Natalia Castro',
        puesto: 'Analista Programador Computacional',
        image: './../../../assets/img/Nati.jpg',
        description: 'Me gusta programar, también tejer a crochet y jugar Valorant.'
      },
      {
        id: 2,
        name: 'Christian Godoy',
        puesto: 'Ingeniería en Informática',
        image: './../../../assets/img/Christian.jpeg',
        description: 'Me gusta el pan con queso y palta.'
      },
      {
        id: 3,
        name: 'Cesar Contreras',
        puesto: 'Analista Programador Computacional',
        image: './../../../assets/img/Cesar.jpeg',
        description: 'Soy el FIFAS.'
      }
    ];
  
  }

  ngOnInit() {

  }

  gotoDetails(equipo: any): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        equipo: JSON.stringify(equipo)
      }
    };
    this.navCtrl.navigateForward(['detalle-equipo/'], navigationExtras);
  };

  buscar(event): void {
    this.busqueda = event.detail.value;
  }

}
