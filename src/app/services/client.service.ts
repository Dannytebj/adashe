import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import { Client } from '../models/Clients';

@Injectable()
export class ClientService {
clients: FirebaseListObservable<any[]>;
client: FirebaseObjectObservable <any>;

  constructor(
    public af: AngularFireDatabase
  ) {
    this.clients = this.af.list('/clients') as FirebaseListObservable<Client[]>;
   }

   getClients () {
     return this.clients;
   }

   createNewClient (client: Client) {
     this.clients.push(client);
   }

   getClient(id: string) {
    return this.client = this.af.object(`/clients/${id}`) as FirebaseObjectObservable<Client>;
   }

   updateClient(id: string, client: Client) {
     return this.clients.update(id, client);
   }
}
