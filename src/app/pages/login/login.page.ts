import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsingLocalstorageService } from '../../services/using-localstorage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  isNotHome = false;

  passPattern = "^(.{0,7}|[^0-9]*|[^a-z]*)$";

  constructor(
    private router: Router,
    private _localStorage: UsingLocalstorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.createForm();
  }

  get email(){
    return this.credentials?.get('email');
  }

  get password(){
    return this.credentials?.get('password');
  }
  
  createForm(){
    this.credentials = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(this.passPattern)]]
    });
  }


  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value.email,this.credentials.value.password);
    await loading.dismiss();

    if(user){
      this._localStorage.saveUserProfileFromDB();
      this.router.navigateByUrl('/welcome');
    }
    else{
      this.alertPresent('Login fallido','Inténtelo más tarde.');
    }
  }

  async alertPresent(header:string,message:string){
    const alert = await this.alertCtrl.create({
      header:header,
      message:message,
      buttons:['OK'],
    });
    alert.present();
  }

}
