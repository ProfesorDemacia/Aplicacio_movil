import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { GoBackButtonComponent } from './go-back-button/go-back-button.component';

@NgModule ({
    declarations: [
        HeaderComponent,
        GoBackButtonComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        GoBackButtonComponent,
    ]
})

export class ComponentsModule {}