import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.page.html',
  styleUrls: ['./detalle-equipo.page.scss'],
})
export class DetalleEquipoPage implements OnInit {


  title = 'Detalle del Equipo'
  equipo = null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.obtenerPersonaje();
  }

  ngOnInit() {
    console.log(this.equipo);
    this.title = this.equipo.name;
  }

  obtenerPersonaje(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.equipo = JSON.parse(params.equipo)
    })
  }
}
