import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'
import { UserService } from 'src/app/services/user.service';
import * as ParcelActions from '../adminParcelsState/parcel.action';
import { ParcelState } from '../adminParcelsState/parcel.reducer';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParcelInterface } from 'src/app/interfaces/parcelInterface';
@Component({
  selector: 'app-new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.css'],
  providers:[{
    provide:MAT_RADIO_DEFAULT_OPTIONS,
    useValue:{color:'accent',width:'10px',height:'10px'}
  },
  {
    provide:STEPPER_GLOBAL_OPTIONS,
    useValue:{showError: true,backgroundColor:'accent'}
  }
]
})
export class NewShipmentComponent implements OnInit {
  
  shipmentForm! :FormGroup
  parcelEx:ParcelInterface={
    parcel_id: 'e7d5170b-8901-43ca-a96c-f18b350834f8',
    parcel_type: 'Document',
    parcel_destination: 'Kisumu',
    parcel_origin: 'Eldoret',
    parcel_destination_phone: '0909090909',
    parcel_origin_phone: '0909090909',
    parcel_weight: '20',
    parcel_status: 'delivered',
    user_id: 'e7d5170b-8901-43ca-a96c-f18b350834f8'
  }

  constructor(private fb:FormBuilder,private userService:UserService,private router: Router, private store: Store<ParcelState>) { }
  
  ngOnInit(): void {
    this.shipmentForm=this.fb.group({
     parcel_type:new FormControl('',Validators.required),
     parcel_destination:new FormControl('',Validators.required),
     parcel_origin:new FormControl('',Validators.required),
     parcel_weight:new FormControl('',[Validators.required,Validators.min(0)]),
    parcel_destination_phone:new FormControl('',[Validators.required/*,Validators.email*/]),
     parcel_origin_phone:new FormControl('',[Validators.required/*,Validators.email*/]),
     parcel_status:new FormControl('',[Validators.required]),
     user_id:new FormControl('e7d5170b-8901-43ca-a96c-f18b350834f8',[Validators.required]),
    });

  }
  feeCheck(){
    console.log(this.shipmentForm)
    console.warn(this.shipmentForm.value)
    this.userService.createOrder(this.shipmentForm.value)
  }
  
  onAdd() {
    const newParcel = this.shipmentForm.value;
console.log(newParcel)
    this.store.dispatch(ParcelActions.AddParcel({ newParcel }));
    this.store.dispatch(ParcelActions.LoadParcels());
    this.shipmentForm.reset();
    //this.router.navigate(['/admin/']);
  }

}
