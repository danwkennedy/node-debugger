import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Debugger } from './debugger';
import { Connection } from './connection';

@Injectable()
export class DebuggerService {

  chrome: any;

  constructor(private http: Http) {
    this.chrome = chrome;
  }

  getDebuggers(host: String, port: Number) : Promise<Debugger[]> {
    return this.http.get(`http://${ host }:${ port }/json/list`)
      .toPromise()
      .then(response => {
        return response.json() as Debugger[]
      });
  }

  connectToDebugger(target: Debugger, connection: Connection) {
    let url = target.devtoolsFrontendUrl;

    if (url.search(new RegExp(`${connection.host}:${connection.port}`)) === -1) {
      url = url.replace(/9229/i, connection.port.toString());
    }

    this.chrome.windows.create({ url: url });
  }
}
