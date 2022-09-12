import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'
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

  constructor(private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.shipmentForm=this.fb.group({
     shipmentType:new FormControl('',Validators.required),
     fromLocation:new FormControl('',Validators.required),
     toLocation:new FormControl('',Validators.required),
     weight:new FormControl('',[Validators.required,Validators.min(0)]),
     toEmail:new FormControl('',[Validators.required,Validators.email]),
     FromEmail:new FormControl('',[Validators.required,Validators.email]),
     status:new FormControl('',[Validators.required]),
    });

  }
  feeCheck(){
    console.log(this.shipmentForm)
    console.warn(this.shipmentForm.value)
  }

}
