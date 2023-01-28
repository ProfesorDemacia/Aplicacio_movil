import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { docData, doc, Firestore, setDoc, updateDoc, deleteDoc, } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { UserProfile } from './userProfile';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { }

  async register(email: string, password: string) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    return docData(userDocRef);
  }

  async uploadAditionalUserInfo(userInfo: Object) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    try {
      await setDoc(userDocRef, {
        name: userInfo['name'],
        lastname: userInfo['lastname'],
        email: userInfo['email'],
        gender: userInfo['gender'],
        userType: userInfo['userType']
      })
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  updateUsuarioPasajero(userInfo: Object) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    console.log('update pasajero')
      return setDoc(userDocRef, {
        name: userInfo['name'],
        lastname: userInfo['lastname'],
        gender: userInfo['gender'],
        cellphone:userInfo['cellphone'],
        address: userInfo['address'],
        commune: userInfo['commune'],
        region: userInfo['region'],
        campus: userInfo['campus'],
      }, { merge: true })
  }


  updateUsuarioChofer(userInfo: Object) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    return setDoc(userDocRef, {
      name: userInfo['name'],
      lastname: userInfo['lastname'],
      gender: userInfo['gender'],
      address: userInfo['address'],
      commune: userInfo['commune'],
      region: userInfo['region'],
      campus: userInfo['campus'],
      car: userInfo['car'],
      tripCost: userInfo['tripCost'],
      seats: userInfo['seats']
    }, { merge: true })
  }

  deleteUserFromFirestore() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    deleteDoc(userDocRef)
      .then(() => {
        console.log("Datos eliminados de BD.");
      })
      .catch(error => {
        console.log(error);
      })
    //delete from auth
      user?.delete()   
      .then(() => {
        console.log("Usuario eliminado de autenticación.");
      })
      .catch(error => {
        console.log(error);
      })
  }
}