import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { MindicatorapiService } from 'src/app/services/mindicatorapi.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {

getdata:any[]=[];


indicadores: any;
infoUF: any;
infoDolar: any;
infoEU: any ;
pesoChileno: number = 0;
respuestaCarga: boolean=false;
transformacion: string = "";

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(public mindicatorapiService: MindicatorapiService, private navController: NavController) {}


  ngOnInit(): void {
    this.cargarUf();
  }

  async cargarUf(cargarmasUf:boolean = false, event?){

    await this.mindicatorapiService.getIndicadores()
    .then(respuesta => {
      this.indicadores = respuesta;
      this.infoUF = respuesta.uf;
      this.infoDolar = respuesta.dolar;
      this.infoEU = respuesta.euro;
      this.respuestaCarga = true;
    },
    (err) => {
      console.log(err);
    });
  }
  ConvertirEuro() {
    
    this.transformacion = (this.pesoChileno/parseFloat(this.infoEU.valor)).toFixed(2) + " euros";
    
  }
  ConvertirDolar() {
    
    this.transformacion = (this.pesoChileno/parseFloat(this.infoDolar.valor)).toFixed(2) + " dólares"

  }
  limpiarCampo(){
    this.transformacion = "";
    this.pesoChileno = 0;
  }

  









}
