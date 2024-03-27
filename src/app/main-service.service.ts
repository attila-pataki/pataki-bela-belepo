import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor() { }

  id: string = ""

  //elso config
  // firebaseConfig =  {apiKey: "AIzaSyCj8F20j4SPlev3gOZ9xwhfq7AKick0zlg",
  //   authDomain: "belepo-pataki.firebaseapp.com",
  //   projectId: "belepo-pataki",
  //   storageBucket: "belepo-pataki.appspot.com",
  //   messagingSenderId: "613146375420",
  //   appId: "1:613146375420:web:165b4c7b72cfc142ce5379"}

  //masodik config
  firebaseConfig = {
    apiKey: "AIzaSyBIMAqt3jSbFv0mLa3Lc0IoWcb1LwJ_Ldg",
    authDomain: "pataki-bela-belepo.firebaseapp.com",
    projectId: "pataki-bela-belepo",
    storageBucket: "pataki-bela-belepo.appspot.com",
    messagingSenderId: "48310658538",
    appId: "1:48310658538:web:73edfd434d26fa9188fe93",
    measurementId: "G-BTVCZ9SKDD"
  };

  app = initializeApp(this.firebaseConfig);

  db = getFirestore(this.app)

  async getRecords(collectionName: string, plate: string | null) {
    if (plate) {
      const q = query(collection(this.db, "recordedVehicles"), where("plate", "==", plate));
      const querySnapshot = await getDocs(q);
      return querySnapshot
    } else {

      const querySnapshot = await getDocs(collection(this.db, collectionName));
      return querySnapshot
    }
  }

  async addRecord(collectionName: string, activeRecord: any) {

    console.log(activeRecord)
    if (collectionName == 'recordedVehicles') {
      activeRecord['consumption'] = Number(activeRecord['consumption'])
      delete activeRecord["mainID"]
    }
    if (collectionName == 'recordedRoutes') { activeRecord['distance'] = Number(activeRecord['distance']) }

    try {
      const docRef = await addDoc(collection(this.db, collectionName), activeRecord);

      console.log("Document written with ID: ", docRef.id, "to collection: ", collectionName);
      return docRef.id
    } catch (e) {
      console.error("Error adding document to collection: [", collectionName, "] error: ", e);
      return "ErrNoID"
    }
  }

  async setRecord(collectionName: string, activeRecord: any, id: string) {

    console.log(activeRecord)
    try {
      const docRef = await setDoc(doc(this.db, collectionName, id), activeRecord);

      console.log("Document OVERwritten with ID: ", id, "to collection: ", collectionName);
      return id
    } catch (e) {
      console.error("Error adding document to collection: [", collectionName, "] error: ", e);
      return "ErrNoID"
    }
  }

  async setID(plate: string) {
    const q = query(collection(this.db, "recordedVehicles"), where("plate", "==", plate));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const exportData: { [keys: string]: string } = querySnapshot.docs[0].data()
      exportData["mainID"] = querySnapshot.docs[0].id
      this.id = querySnapshot.docs[0].id
      // console.log(exportData)
      return (exportData)
    } else {
      this.id = ""
      return {}
    }
  }

}
