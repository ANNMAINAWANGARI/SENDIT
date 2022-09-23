import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { CustomersComponent } from './customers/customers.component';
import { NewShipmentComponent } from './new-shipment/new-shipment.component';
import { LoginGuard } from 'src/app/guards/login.guard';
const routes: Routes = [{path:'', children:[
  {path:'admin',component:AdminComponent,canActivate: [LoginGuard],children:[
  {path:'',component:ParcelsComponent,canActivate: [LoginGuard]},
  {path:'parcels',component:ParcelsComponent,canActivate: [LoginGuard]},
  {path:'customers',component:CustomersComponent,canActivate: [LoginGuard]},
  {path:'newShipment',component:NewShipmentComponent,canActivate: [LoginGuard]}]}]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
