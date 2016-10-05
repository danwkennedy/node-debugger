import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Connection } from '../connection';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 9229;

@Component({
  selector: 'connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {

  @Input()
  connection: Connection;
  @Output()
  onSave = new EventEmitter();
  @Output()
  onConnect = new EventEmitter();

  constructor() { }

  ngOnInit() : void {
    if (!this.connection) {
      this.connection = {
        host: DEFAULT_HOST,
        port: DEFAULT_PORT
      } as Connection;
    }

    console.log(this.connection);
    console.log(this.onSave);
    console.log(this.onConnect);
  }

  onStartConnection(connection: Connection) {
    this.onConnect.emit(connection);
  }

  onSaveConnection(connection: Connection) {
    console.log('Checking connection');
    this.onSave.emit(connection);
  }
}
