import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsingLocalstorageService } from 'src/app/services/using-localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerCredentials!: FormGroup;

  isNotHome = false;

  passPattern = "^(.{0,7}|[^0-9]*|[^a-z]*)$";
  
  constructor( private router: Router,
    private _localStorage: UsingLocalstorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.createForm();
  }
  get email(){
    return this.registerCredentials?.get('email');
  }

  get password(){
    return this.registerCredentials?.get('password');
  }

  get name(){
    return this.registerCredentials?.get('name');
  }

  get lastname(){
    return this.registerCredentials?.get('lastname');
  }
  
  createForm(){
    this.registerCredentials = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['',[Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(6),
                    Validators.pattern(this.passPattern)]],
      userType: ['', Validators.required]
    });
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.register(this.registerCredentials.value.email,this.registerCredentials.value.password);
    await loading.dismiss();

    if(user){
      this.authService.uploadAditionalUserInfo(this.registerCredentials.value);
      this._localStorage.saveUserProfileFromDB();
      this.router.navigateByUrl('/welcome');
    }
    else{
      this.alertPresent('Registro fallido','Inténtelo más tarde.');
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
