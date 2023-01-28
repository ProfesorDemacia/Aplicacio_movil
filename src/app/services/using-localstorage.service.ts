import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsingLocalstorageService {

  username: string = '';
  name: string = '';
  profile: any = [];
  userType: string = ''

  constructor(private _auth: AuthService) {
  }

  //antiguo
  saveUsername(email: string) {
    localStorage.setItem('username', email);
  }

  saveUserProfileFromDB() {
    this.clearLocalStorage();
    this._auth.getUserProfile().subscribe((respuesta:any) => {
      this.profile = respuesta;
      localStorage.setItem('name', this.profile.name);
      localStorage.setItem('lastname', this.profile.lastname);
      localStorage.setItem('gender', this.profile.gender);
      localStorage.setItem('userType', this.profile.userType);
    });
  }

  getUsername(): string {
    //this.username = localStorage.getItem('username')?.split("@")[0] || '';
    this.username = localStorage?.getItem('name');
    return this.username;
  }

  getGender(): string {
    return localStorage?.getItem('gender');
  }

  getUserType():string {
    return localStorage?.getItem('userType');
  }

  clearLocalStorage() {
    localStorage.clear();
  }

}
