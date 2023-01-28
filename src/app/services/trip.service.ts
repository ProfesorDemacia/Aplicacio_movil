import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, deleteDoc, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private auth: Auth,
    private firestore: Firestore) { }


  async insertGoHomeRequest(userInfo: Object) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `solicitudes/${user?.uid}`);
    try {
      await setDoc(userDocRef, {
        name: userInfo['name'],
        lastname: userInfo['lastname'],
        gender: userInfo['gender'],
        userType: userInfo['userType'],
        address: userInfo['address'],
        commune: userInfo['commune'],
        region: userInfo['region'],
        seats: userInfo['seats'],
        imageUrl: userInfo['imageUrl'],
        campus: userInfo['campus'],
        car: userInfo['car'],
        tripCost: userInfo['tripCost']
      })
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteGoHomeRequest() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `solicitudes/${user?.uid}`);
    deleteDoc(userDocRef)
      .then(() => {
        console.log("Solicitud eliminada de BD.");
      })
      .catch(error => {
        console.log(error);
      })
  }

  async searchForCoincidence(commune: string) {
    const q = query(collection(this.firestore, "solicitudes"), where('commune', "==", commune));

    const querySnapshot = await getDocs(q);
    let itemsArr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const dataDoc = doc.data();
      const id = doc.id;
      itemsArr.push({ id, ...dataDoc });
    });
    return itemsArr;
  }

  async passengerTripSearch() {
    const user = this.auth.currentUser;
    const q = query(collection(this.firestore, "viaje"), where('idDriver', "==", user?.uid));

    const querySnapshot = await getDocs(q);
    let itemsArr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const dataDoc = doc.data();
      const id = doc.id;
      itemsArr.push({ id, ...dataDoc });
    });
    return itemsArr;
  }

  async chooseDriverToTravel(driverInfo: Object, userInfo: Object) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `viaje/${user?.uid}`);
    try {
      await setDoc(userDocRef, {
        idDriver: driverInfo['id'],
        tripCost: driverInfo['tripCost'],
        name: userInfo['name'],
        lastname: userInfo['lastname'],
        address: userInfo['address'],
        commune: userInfo['commune'],
        cellphone: userInfo['cellphone'],
        region: userInfo['region'],
        imageUrl: userInfo['imageUrl'],
        campus: userInfo['campus'],
      })
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteTripRequest() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `viaje/${user?.uid}`);
    deleteDoc(userDocRef)
      .then(() => {
        console.log("Solicitud eliminada de BD.");
      })
      .catch(error => {
        console.log(error);
      })
  }

}
