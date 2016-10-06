import { Component } from '@angular/core';
import { StorageService } from './storage.service';
import { DebuggerService } from './debugger-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ StorageService, DebuggerService ]
})
export class AppComponent {
  constructor( ) { }
}
