import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { DebuggerService } from '../debugger-service.service';
import { StorageService } from '../storage.service';
import { Connection } from '../connection';

@Component({
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.scss'],
  providers: [ ConnectionService ]
})
export class ConnectionListComponent implements OnInit {
  connections = [];
  active = [];
  inactive = [];

  constructor(private connectionService: ConnectionService, private debuggerService: DebuggerService, private storageService: StorageService) { }

  ngOnInit() {
    this.connections = [];
    this.active = [];
    this.inactive = [];
    this.refreshList();
  }

  refreshList() {
    this.connections = [];
    this.active = [];
    this.inactive = [];

    this.connectionService.getConnections().then(connections => {
      this.connections = connections || [];

      this.connections.map( connection => {
        this.debuggerService.available(connection)
          .then( available => {
            console.log()
            if (available) {
              this.active.push(connection);
            } else {
              this.inactive.push(connection);
            }
          });
      });

      let def = { host: 'localhost', port: 9229, name: 'Default' } as Connection;

      this.debuggerService.available(def)
        .then( available => {
          if (available) {
            this.active.push(def);
          }
        })
    });
  }

  selectConnection(connection: Connection) {
    console.log(`Starting a debugging session for: http://${ connection.host }:${ connection.port }`);
    this.debuggerService.getDebuggers(connection.host, connection.port)
      .then(debuggers => {
        console.log(debuggers);

        if (!!debuggers.length) {
          this.debuggerService.connectToDebugger(debuggers[0], connection);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  removeConnection(connection: Connection) {
    console.log(`Removing connection named '${ connection.name }'`);
    this.storageService.get({connections: []}).then(({ connections }) => {
      connections.splice(connections.indexOf(connection), 1);

      if (!!connections.length) {
        return this.storageService.set({ connections: connections });
      } else {
        return this.storageService.remove('connections');
      }
    }).then(() => {
      this.refreshList();
    });
  }
}
