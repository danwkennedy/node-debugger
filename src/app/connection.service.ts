import { Injectable } from '@angular/core';
import { Connection } from './connection';
import { StorageService } from './storage.service';

@Injectable()
export class ConnectionService {

  constructor(private storage: StorageService) { }

  getConnections() : Promise<Connection[]> {
    return this.storage.get({connections: [{ name: 'Default', host: 'localhost', port: 9229 }]}).then( ({ connections }) => {
      return connections as Connection[];
    });
  }

}
