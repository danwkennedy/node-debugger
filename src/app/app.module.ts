import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { ConnectionListComponent } from './connection-list/connection-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionFormComponent,
    ConnectionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
