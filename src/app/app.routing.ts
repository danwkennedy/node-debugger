import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { ConnectionListComponent } from './connection-list/connection-list.component';

const appRoutes: Routes = [
  { path: '', component: ConnectionListComponent },
  {
    path: 'add',
    component: ConnectionFormComponent,
    data: {
      title: 'Add Connection'
    }
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
