import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from '../connection';
import { StorageService } from '../storage.service';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 9229;

@Component({
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {

  @Input()
  connection: Connection;

  constructor(private storage : StorageService, private router: Router) { }

  ngOnInit() : void {
    if (!this.connection) {
      this.connection = {
        name: 'Default',
        host: DEFAULT_HOST,
        port: DEFAULT_PORT
      } as Connection;
    }
  }

  onSaveConnection(connection: Connection) {
    console.log(`Saving connection ${ connection.host }:${ connection.port }`);
    this.storage.get({connections: [] }).then(({ connections }) => {
      connections.push(connection);

      return this.storage.set({ connections: connections });
    }).then(() => {
      console.log('Successfully saved connection');
      this.router.navigate(['/']);
    });
  }
}
