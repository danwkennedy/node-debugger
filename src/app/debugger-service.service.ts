import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Debugger } from './debugger';

@Injectable()
export class DebuggerService {

  constructor(private http: Http) { }

  getDebuggers(host: String, port: Number) : Promise<Debugger[]> {
    return this.http.get(`http://${ host }:${ port }/json/list`)
      .toPromise()
      .then(response => {
        return response.json() as Debugger[]
      });
  }

}
