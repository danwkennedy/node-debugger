import { Injectable } from '@angular/core';
import { Connection } from './connection';
import { StorageService } from './storage.service';

@Injectable()
export class ConnectionService {

  constructor(private storage: StorageService) { }

  getConnections() : Promise<Connection[]> {
    return this.storage.get('connections').then( res => res.connection as Connection[]);
  }

}
