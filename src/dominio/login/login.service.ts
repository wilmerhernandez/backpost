import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable()
export class LoginService  {
response: {message:string,status:number} = {message:"",status:200};
    firebaseInitialized: boolean = false;
  responseDataLogin: { doc: string; key: string; rol: string; typeDoc: string; token?:string};


    
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
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL:'https://gnexus-dd24e-default-rtdb.firebaseio.com/'
        // Aquí puedes agregar otras configuraciones de Firebase según sea necesario
      });

      console.log('Firebase initialized');
      this.firebaseInitialized = true;
    }
  }

    async createUser(user:string,password:string,name:string,phone:string,typeDoc:string,doc:string,country:string,typeDoCountry:string,DoCountry:string,rol:string):Promise<{message:string,status:number}>{
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
        
        this.sendData('Users',userRecord.uid,{key:btoa(password),typeDoc,doc,rol})
        this.sendData('Country',DoCountry,{country,typeDoCountry,DoCountry});

        
      })
      .catch((error) => {
        this.response.message = error.errorInfo.message;
        this.response.status = 400;
        console.log('Error creating new user:', error);
      });
    return this.response;
}

getDatabase() {
  return admin.database();
}

async getData(path: string, key: string): Promise<{ doc: string; key: string; rol: string; typeDoc: string; }> {
  return new Promise((resolve, reject) => {
      this.getDatabase().ref(path + "/" + key).on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
              resolve(data);
          } else {
              resolve({ doc: "", key: "", rol: "", typeDoc: "" });
          }
      }, (errorObject) => {
          console.log('The read failed: ' + errorObject.name);
          reject({ doc: "", key: "", rol: "", typeDoc: "" });
      });
  });
}

 sendData(path: string, key: string, data: any) {
  const ref = this.getDatabase().ref(path).child(key);
  ref.set(data);
}


async Login(email: string): Promise<{ doc: string; key: string; rol: string; typeDoc: string; token?: string }> {
  this.initFirebase();
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
      
      this.responseDataLogin = await this.getData('Users', userRecord.uid);
      this.responseDataLogin.token = token;
      console.log(`Successfully fetched user data: ${JSON.stringify(this.responseDataLogin)}`);
  } catch (error) {
      console.error('Error fetching user data:', error);
      this.responseDataLogin = null;
  }

  return this.responseDataLogin;
}





}
