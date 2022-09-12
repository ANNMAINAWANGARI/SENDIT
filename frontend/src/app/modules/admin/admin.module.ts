import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { CustomersComponent } from './customers/customers.component';
import { NewShipmentComponent } from './new-shipment/new-shipment.component';
import {MatSelectModule, } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    ParcelsComponent,
    CustomersComponent,
    NewShipmentComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AdminModule { }
