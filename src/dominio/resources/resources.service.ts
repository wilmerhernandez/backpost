import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { DataDto } from 'src/modelos/resources.model';

@Injectable()
export class ResourcesService {
    constructor(private firebase:FirebaseService){
        
    }
    async getTypeDoc():Promise<DataDto>{
        this.firebase.initFirebase();
       let responseTypeDoc = await this.firebase.getData("Resources","typeDoc");
       console.log(responseTypeDoc,'responseTypeDoc');
       return responseTypeDoc;
    }
    async getRoles():Promise<DataDto>{
        this.firebase.initFirebase();
        let responseTypeDoc = await this.firebase.getData("Resources","roles");
        console.log(responseTypeDoc,'responseTypeDoc');
        return responseTypeDoc;
     }
}
