import { Injectable, isDevMode } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth,signOut , createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {getDatabase, ref, set } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { ActionStatus } from '../../../others/actionstatus';
import { FireBaseConstant } from './firebase-constant'
// declare var firebase:any;

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataBaseApi {
  static firebaseConfig: any = {};


  debug: boolean = false;
  offlineMode: boolean = false;
  db: any;
  firebase = null;
  firebaseAuth=null;

  constructor() {

    if (isDevMode()) {
      console.log("Dev Mode")
      FirebaseDataBaseApi.firebaseConfig= {
        apiKey: "AIzaSyD31cRxzdmCgYMX_trB9ZVndWyLcprc1Fk",

        authDomain: "rdm-event.firebaseapp.com",
      
        databaseURL: "https://rdm-event-default-rtdb.firebaseio.com",
      
        projectId: "rdm-event",
      
        storageBucket: "rdm-event.appspot.com",
      
        messagingSenderId: "421117252824",
      
        appId: "1:421117252824:web:57ed9ce01fe61b2ece33ad",
      
        measurementId: "G-8W1L58D71W"
      
      };
    }
    else
    {
      console.log("prod mode")
      FirebaseDataBaseApi.firebaseConfig= {
        apiKey: "AIzaSyD31cRxzdmCgYMX_trB9ZVndWyLcprc1Fk",

        authDomain: "rdm-event.firebaseapp.com",
      
        databaseURL: "https://rdm-event-default-rtdb.firebaseio.com",
      
        projectId: "rdm-event",
      
        storageBucket: "rdm-event.appspot.com",
      
        messagingSenderId: "421117252824",
      
        appId: "1:421117252824:web:57ed9ce01fe61b2ece33ad",
      
        measurementId: "G-8W1L58D71W"
      
        };
    }

    // Initialize Firebase
    this.firebase=initializeApp(FirebaseDataBaseApi.firebaseConfig);
    // firebase.analytics();
    this.db = getDatabase(this.firebase);
    this.firebaseAuth=getAuth(this.firebase)
    this.setDebugMode();
    this.setModeApp();
  }
  setDebugMode() {
    // if(this.debug) firebase.firestore.setLogLevel('debug');

  }
  setModeApp() {
    // if(this.offlineMode) firebase.firestore().enablePersistence();
  }
  getFirebaseFile()
  {
    return getStorage(this.firebase);
  }
  getFirebaseDatabase() {
    return this.db;
  }
  add(url: string, value: any): Promise<ActionStatus<any>> {
    let action = new ActionStatus();
    return new Promise((resolve, reject) => {
      this.db.ref(url).push().set(value).then((doc: any) => {
        action.description = 'successful add new collection';
        resolve(action);
      }).catch((err: any) => {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = 'Description of error: ' + err;
        reject(action);
      });
    });
  }
  set(url: string, value: any): Promise<ActionStatus<any>> {
    let action = new ActionStatus<any>();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      set(ref(this.db,url),value).then(() => {
        action.message = 'success';
        action.description = 'successful set new collection';
        resolve(action);
      }).catch((err: any) => {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = 'Description of error: ' + err;
        reject(action)
      });
    })
  }
  fetchOnce(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus();
    return new Promise((resolve, reject) => {
      this.db.ref(url).once('value')
        .then((doc: any) => {
          try {
            action.result = doc.val();
            action.description = 'Successful fetching information';
            resolve(action);
          }
          catch (err: any) {
            action.apiCode = err.code;
            action.code = ActionStatus.UNKNOW_ERROR;
            action.message = 'error';
            action.description = `Description of error: ${err}`;
            reject(action);
          }
        })
    });
  }


  fetch(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      this.db.ref(url).on('value', (doc: any) => {
        try {
          // let r=[];
          // doc.forEach(element => {
          //   r.push(element.val());
          // });
          action.description = 'Successful fetching information';
          action.result = doc.val();
          resolve(action);
        }
        catch (err: any) {
          action.apiCode = err.code;
          action.code = ActionStatus.UNKNOW_ERROR;
          action.message = 'error';
          action.description = `Description of error: ${err}`;
          reject(action);
        }
      });
    });
  }

  update(url: string, updates: any): Promise<ActionStatus<any>> {
    let action = new ActionStatus();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      try {
        this.db.ref(url).update(updates);
        action.description = 'Successful update information';
        resolve(action);
      }
      catch (err: any) {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = `Description of error: ${err}`;
        reject(action);
      }
    });
  }

  updates(updates: { link: String, data: any }[]): Promise<ActionStatus<any>> {
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      let up: any = {};
      let result = new ActionStatus();
      updates.forEach((update: any) => up[update.link.toString()] = update.data);
      this.db.ref().update(up, (error: any) => {
        if (error) {
          result.apiCode = error.error;
          result.message = error.message;
          return reject(result);
        }
        resolve(result);
      })
    })

  }

  delete(url: string): Promise<ActionStatus<any>> {
    let action = new ActionStatus();
    return new Promise<ActionStatus<any>>((resolve, reject) => {
      try {
        this.db.ref(url).remove();
        action.description = 'Successful deleting information';
        resolve(action);
      }
      catch (err: any) {
        action.apiCode = err.code;
        action.code = ActionStatus.UNKNOW_ERROR;
        action.message = 'error';
        action.description = `Description of error: ${err}`;
        reject(action);
      }
    });

  }
  get user() {
    return this.firebaseAuth.currentUser;
  }

  signInApi(email: string, password: string): Promise<ActionStatus<any>> {
    let result: ActionStatus<any> = new ActionStatus<any>();
    return new Promise(async (resolve, reject) => {
      signInWithEmailAndPassword(this.firebaseAuth,email, password)
        .then((userCredential: any) => {
          result.description = 'Authentification successful';
          result.result = userCredential;
          // console.log("Credential ",userCredential.user)
          resolve(result);
        })
        .catch((error: any) => {
          result.code = ActionStatus.UNKNOW_ERROR;
          result.apiCode = error.code;
          result.message = 'error';
          result.description = `Description of error: ${error}`;
          reject(result);
        })
    });
  }

  signOutApi():Promise<ActionStatus<boolean>> {
    let r=new ActionStatus<boolean>()
    r.result=true;
    return new Promise<ActionStatus<boolean>> ((resolve,reject)=>{
      signOut(this.firebaseAuth).then((result)=>resolve(r))
      .catch((error)=>{
        r.result=false;
        reject(r)
      });
    })
  }

  updateUser(user:Record<string,any>):Promise<ActionStatus<any>>
  {
    return new Promise<ActionStatus<any>>((resolve,reject)=>{
      let r: any={}
      if(user.hasOwnProperty("name")) r['displayName'] = user['name'];
      if(user.hasOwnProperty("photoUrl")) r['photoURL']=user['photoUrl']
      this.db.currentUser.updateProfile(r)
      .then(()=>resolve(new ActionStatus<any>()))
      .catch((error: any)=>{
        let result:ActionStatus<any> = new ActionStatus<any>();
        result.apiCode=error.error;
        result.message=error.getMessage();
      })
    })
  }

  createUserApi(email: string, password: string): Promise<ActionStatus<any>> {
    let result: ActionStatus<any> = new ActionStatus<any>();
    return new Promise(async (resolve, reject) => {

      createUserWithEmailAndPassword(this.firebaseAuth,email, password)
        .then((userCredential: any) => {
          result.description = 'Account was created successful';
          result.result = userCredential.user;
          resolve(result);
        })
        .catch((error: any) => {
          result.code = ActionStatus.UNKNOW_ERROR;
          result.apiCode = error.code;
          result.message = `error: ${error.code}`;
          result.description = `Description of error: ${error.message}`;
          reject(result);
        });
    });
  }

  handleConnexionState(callBack: any) {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        callBack({ connected: true });
        // ...
      } else {
        // User is signed out
        callBack({ connected: false });
      }
    });
  }

  handleApiError(result: ActionStatus<any>) {
    switch (result.apiCode) {
      case FireBaseConstant.AUTH_WRONG_PASSWORD:
      case FireBaseConstant.AUTH_USER_NOT_FOUND:
        // result.message = 'Incorrect email or password';
        result.message="Email ou mot de passe incorrect";
        break;
      case FireBaseConstant.AUTH_WEAK_PASSWORD:
        // result.message = 'Password must have at least 6 characters'
        result.message="Le mot de passe doit avoir au moins 6 carractéres"
        break;
      case FireBaseConstant.AUTH_EMAIL_ALREADY_USE:
        // result.message = 'Email already used by another user';
        result.message="Email déjà utilisé"
        break;
      case FireBaseConstant.NET_NETWORK_FAIL:
        // result.message = 'Offline. Please check your network connectivity';
          result.message="Hors ligne. Veuillez vérifier votre connection réseau"
          break
      case FireBaseConstant.DESACTIVED_ACCOUNT:
        // result.message="Account Disabled. Contacted the administrator for a reactivation"
        result.message="Compte désactivé. Contactez l'administrateur"
        break;
    };
  }
}
