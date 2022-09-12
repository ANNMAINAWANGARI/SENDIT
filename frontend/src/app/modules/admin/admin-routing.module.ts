import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { CustomersComponent } from './customers/customers.component';
import { NewShipmentComponent } from './new-shipment/new-shipment.component';
const routes: Routes = [{path:'', children:[
  {path:'admin',component:AdminComponent,children:[
  {path:'',component:ParcelsComponent},
  {path:'parcels',component:ParcelsComponent},
  {path:'customers',component:CustomersComponent},
  {path:'newShipment',component:NewShipmentComponent}]}]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
