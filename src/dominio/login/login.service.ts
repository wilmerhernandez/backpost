import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';


@Injectable()
export class LoginService  {
response: {message:string,status:number} = {message:"",status:200};
    firebaseInitialized: boolean = false;


    
    base64Decode(obj) {
        const decodedObj = {};
        for (let key in obj) {
          const decodedKey = Buffer.from(key, 'base64').toString('utf-8');
          const decodedValue = Buffer.from(obj[key], 'base64').toString('utf-8');
          decodedObj[decodedKey] = decodedValue;
        }
        return decodedObj;
      }
      



  private initFirebase() {
    if (!this.firebaseInitialized) {
      const objectCryp = require('../../config');
      const serviceAccount = this.base64Decode(objectCryp.data);
        console.log(serviceAccount,'serviceAccount')
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Aquí puedes agregar otras configuraciones de Firebase según sea necesario
      });

      console.log('Firebase initialized');
      this.firebaseInitialized = true;
    }
  }

    async createUser(user:string,password:string,name:string,phone:string):Promise<{message:string,status:number}>{
        this.initFirebase();
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
        console.log('Successfully created new user:', this.response);
      })
      .catch((error) => {
        this.response.message = error.errorInfo.message;
        this.response.status = 400;
        console.log('Error creating new user:', error);
      });
    return this.response;
}


}
