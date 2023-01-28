import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEquipo'
})
export class FiltroEquipoPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (texto === ''){
      return lista;
    }

    return lista.filter(item => {
      return item.name.toLowerCase().includes(texto)
    } )

  }

}
