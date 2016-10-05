import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.scss'],
  providers: [ ConnectionService ]
})
export class ConnectionListComponent implements OnInit {

  connections = [];

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.connections = [];
    this.connectionService.getConnections().then(connections => {
      console.log(connections);
      this.connections = connections || [];
    });
  }

}
