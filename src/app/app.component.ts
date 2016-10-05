import { Component, OnInit } from '@angular/core';
import { StorageService } from './storage.service';
import { DebuggerService } from './debugger-service.service';
import { Connection } from './connection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ StorageService, DebuggerService ]
})
export class AppComponent implements OnInit {
  name = `Node Debugger`;

  constructor(private debuggers : DebuggerService, private storage : StorageService ) { }

  startSession(connection: Connection): void {
    console.log(`Starting a debugging session for: http://${ connection.host }:${ connection.port }`);
    this.debuggers.getDebuggers(connection.host, connection.port)
      .then(debuggers => {
        console.log(debuggers);

        if (!!debuggers.length) {
          this.debuggers.connectToDebugger(debuggers[0], connection);
        }

      })
      .catch(err => {
        console.error(err);
      });
  }

  saveConnection(connection: Connection): void {
    console.log(`Saving connection ${ connection.host }:${ connection.port }`);
    this.storage.get({connections: [] }).then(({ connections }) => {
      connections.push(connection);

      return this.storage.set({ connections: connections });
    }).then(() => {
      console.log('Successfully saved connection');
    });
  }

  ngOnInit() : void {

  }

  removeConnection(connection: Connection) : void {
    console.log(`Removing connection named '${ connection.name }'`);
    this.storage.get({connections: []}).then(({ connections }) => {
      connections.splice(connections.indexOf(connection), 1);

      if (!!connections.length) {
        return this.storage.set({ connections: connections });
      } else {
        return this.storage.remove('connections');
      }

    });
  }

}
