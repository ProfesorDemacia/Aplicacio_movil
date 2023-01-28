import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsingLocalstorageService } from '../../services/using-localstorage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profilecredentials!: FormGroup;
  profile: any = [];
  userTypeFromLS: any;
  isNotHome = true;

  profileLoading: HTMLIonLoadingElement;

  handlerMessage = '';
  roleMessage = '';

  constructor(private authService:AuthService, 
              private router:Router,
              private ctrlAlert: AlertController,
              private avatarService: AvatarService,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private toastController: ToastController,
              private usingLocalstorageService: UsingLocalstorageService) { 
    
    this.getUserProfile();
  }

  ngOnInit() {
    this.showLoading();
    this.createForm();
  }

  getUserProfile() {
    this.authService.getUserProfile().subscribe((respuesta:any) => {
      this.profile = respuesta;
      this.fillForm();
      this.profileLoading.dismiss();
    })
  }
  
  async uploadAvatar() {
    const avatar = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera //Photo o promt
    })

    if (avatar) {
      const loading = await this.ctrlAlert.create();
      await loading.present();
      const result = await this.avatarService.uploadAvatar(avatar);
      loading.dismiss();

      if (!result) {
        console.log('no hay resultado?')
        this.alertPresent('Carga fallida','Imagen no ha sido subida correctamente.')
      }
    }
  }

  async alertPresent(header:string, message: string) {
    const alert = await this.ctrlAlert.create({
      header: header,
      message: message,
      buttons: ['OK']
    })
  }

  get email(){
    return this.profilecredentials?.get('email');
  }

  get name(){
    return this.profilecredentials?.get('name');
  }

  get lastname(){
    return this.profilecredentials?.get('lastname');
  }

  get address(){
    return this.profilecredentials?.get('address');
  }

  get commune(){
    return this.profilecredentials?.get('commune');
  }

  get region(){
    return this.profilecredentials?.get('region');
  }

  get userType() {
    return this.profilecredentials?.get('userType');
  }

  get car(){
    return this.profilecredentials?.get('car');
  }

  get tripCost(){
    return this.profilecredentials?.get('car');
  }

  get seats(){
    return this.profilecredentials?.get('seats');
  }

  get cellphone(){
    return this.profilecredentials?.get('cellphone');
  }
  

  createForm(){
    this.userTypeFromLS = localStorage?.getItem('userType')
    if (this.userTypeFromLS == 'chofer' ) {
      this.profilecredentials = this.formBuilder.group({
        email: [{value: '',  disabled: true}, [Validators.required,Validators.email]],
        name: [ {value: ''}, [Validators.required]],
        lastname: [ {value: ''}, [Validators.required]],
        gender: ['', Validators.required],
        userType: ['', Validators.required],
        address: ['', Validators.required],
        commune: ['', Validators.required],
        region: ['', Validators.required],
        campus: ['', Validators.required],
        car: ['', Validators.required],
        tripCost: ['', Validators.required],
        seats:['', Validators.required]
      });
    }
    else {
      this.profilecredentials = this.formBuilder.group({
        email: [{value: '',  disabled: true}, [Validators.required,Validators.email]],
        name: [ {value: ''}, [Validators.required]],
        lastname: [ {value: ''}, [Validators.required]],
        cellphone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
        gender: ['', Validators.required],
        userType: [{value: '',  disabled: true}, Validators.required],
        address: ['', Validators.required],
        commune: ['', Validators.required],
        region: ['', Validators.required],
        campus: ['', Validators.required],
      });
    }
  }

  fillForm() {
    this.profilecredentials.patchValue({
      email: this.profile?.email,
      name: this.profile?.name,
      lastname: this.profile?.lastname,
      gender: this.profile?.gender,
      userType: this.profile?.userType,
      cellphone: this.profile?.cellphone,
      address: this.profile?.address,
      commune: this.profile?.commune,
      region: this.profile?.region,
      campus: this.profile?.campus,
      car: this.profile?.car,
      tripCost: this.profile?.tripCost,
      seats: this.profile?.seats
    })
  }

  showValues() {
    console.log('val', this.profilecredentials.value);
  }

  async updateProfile() {
    if (this.userTypeFromLS == 'chofer' ) {
      await this.authService.updateUsuarioChofer(this.profilecredentials.value).then(respuesta => {
        this.presentToast();
      });
    }
    else {
      await this.authService.updateUsuarioPasajero(this.profilecredentials.value).then(respuesta => {
        this.presentToast();
      });
    }
  }

  async showLoading() {
    this.profileLoading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circles',
    });

    this.profileLoading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu información ha sido actualizada.',
      duration: 2000,
    });
    toast.present();
  }

  deleteProfile() {
    this.authService.deleteUserFromFirestore();
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  async presentAlertForDelete() {
    const alert = await this.ctrlAlert.create({
      header: '¿Seguro que deseas eliminar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.deleteProfile();
          },
        },
      ],
    });

    await alert.present();
  }

}
