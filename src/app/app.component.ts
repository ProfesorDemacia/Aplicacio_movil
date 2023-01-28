import { Component, Input, Output } from '@angular/core';
import { UsingLocalstorageService } from './services/using-localstorage.service';
import { AuthService } from './services/auth.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @Input() isNotHome: boolean;

  public appPages = [
    { title: 'Inicio', url: '/welcome', icon: 'home' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Retornar a mi hogar', url:'/return-trip', icon: 'car'},
    { title: 'Nosotros', url: '/about', icon: 'people' },
    { title: 'Conversor', url: '/conversor', icon: 'cash' },
    { title: 'Clima', url: '/weather', icon: 'umbrella'}
  ];

  username: string;
  constructor( private _localStorage: UsingLocalstorageService,
                private _auth: AuthService) {
    defineCustomElements(window);
  }

  ngOnInit() {
    //this.cleanAll();
  }

  cleanAll() {
    this._localStorage.clearLocalStorage();
    this.username = '';
    this._auth.logout();
  }

  ngDoCheck() {
    this.username = this._localStorage.getUsername();
  }
}
