import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnderConstructionPageRoutingModule } from './under-construction-routing.module';

import { UnderConstructionPage } from './under-construction.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnderConstructionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UnderConstructionPage]
})
export class UnderConstructionPageModule {}
