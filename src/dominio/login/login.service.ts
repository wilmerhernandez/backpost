import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';


@Injectable()
export class LoginService  {
response: {message:string,status:number} = {message:"",status:200};
    firebaseInitialized: boolean = false;
  responseDataLogin: { doc: string; key: string; rol: string; typeDoc: string; token?:string};

  constructor(private firebase:FirebaseService){

  }
    


    async createUser(user:string,password:string,name:string,phone:string,typeDoc:string,doc:string,country:string,typeDoCountry:string,DoCountry:string,rol:string):Promise<{message:string,status:number}>{
        this.firebase.initFirebase();
    await admin.auth().createUser({
        email: user,
        emailVerified: false,
        phoneNumber: phone,
        password: password,
        displayName: name,
        disabled: false,
      })
      .then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid);
        this.response.message = userRecord.uid;
        
        this.firebase.sendData('Users',userRecord.uid,{key:btoa(password),typeDoc,doc,rol})
        this.firebase.sendData('Country',DoCountry,{country,typeDoCountry,DoCountry});
      })
      .catch((error) => {
        this.response.message = error.errorInfo.message;
        this.response.status = 400;
        console.log('Error creating new user:', error);
      });
    return this.response;
}








async Login(email: string): Promise<{ doc: string; key: string; rol: string; typeDoc: string; token?: string }> {
  this.firebase.initFirebase();
  try {
      const userRecord = await admin.auth().getUserByEmail(email);
      console.log(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
      let token;
      try {
          const customToken = await admin.auth().createCustomToken(userRecord.uid);
          token = customToken;
          // Send token back to client
      } catch (error) {
          console.error('Error creating custom token:', error);
      }
      
      this.responseDataLogin = await this.firebase.getData('Users', userRecord.uid);
      this.responseDataLogin.token = token;
      console.log(`Successfully fetched user data: ${JSON.stringify(this.responseDataLogin)}`);
  } catch (error) {
      console.error('Error fetching user data:', error);
      this.responseDataLogin = null;
  }

  return this.responseDataLogin;
}





}
