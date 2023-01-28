import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnTripPageRoutingModule } from './return-trip-routing.module';

import { ReturnTripPage } from './return-trip.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnTripPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ReturnTripPage]
})
export class ReturnTripPageModule {}
