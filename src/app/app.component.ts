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

  constructor(private debuggers : DebuggerService ) { }

  startSession(connection: Connection): void {
    console.log(`Starting a debugging session for: http://${ connection.host }:${ connection.port }`);
    this.debuggers.getDebuggers(connection.host, connection.port)
      .then(debuggers => {
        console.log(debuggers);

        if (!!debuggers.length) {
          let url = debuggers[0].devtoolsFrontendUrl;

          if (url.search(new RegExp(`${connection.host}:${connection.port}`)) === -1) {
            url = url.replace(/9229/i, connection.port.toString());
          }

          chrome.windows.create({ url: url });
        }

      })
      .catch(err => {
        console.error(err);
      });
  }

  saveConnection(connection: Connection): void {
    console.log(`Saving connection ${ connection.host }:${ connection.port }`);
  }

  ngOnInit() : void {

  }

}
