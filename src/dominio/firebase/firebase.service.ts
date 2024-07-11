import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import 'firebase/auth';

@Injectable()
export class FirebaseService {
    firebaseInitialized: boolean;


        
    base64Decode(obj) {
        const decodedObj = {};
        for (let key in obj) {
          const decodedKey = Buffer.from(key, 'base64').toString('utf-8');
          const decodedValue = Buffer.from(obj[key], 'base64').toString('utf-8');
          decodedObj[decodedKey] = decodedValue;
        }
        return decodedObj;
      }
      
      async getData(path: string, key: string): Promise<any> {
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
      getDatabase() {
        return admin.database();
      }
      sendData(path: string, key: string, data: any) {
        const ref = this.getDatabase().ref(path).child(key);
        ref.set(data);
      }

  initFirebase() {
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
}
