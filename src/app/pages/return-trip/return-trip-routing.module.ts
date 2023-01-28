import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnTripPage } from './return-trip.page';

const routes: Routes = [
  {
    path: '',
    data: {title: 'Viaje de retorno'},
    component: ReturnTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnTripPageRoutingModule {}
