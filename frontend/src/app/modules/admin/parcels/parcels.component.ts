
import * as fromParcel from '../adminParcelsState/parcel.reducer';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as parcelActions from '../adminParcelsState/parcel.action';
import { identity, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminServicesService} from '../../../services/admin-services.service'


interface ParcelInfo {
  id:number,
  destination: string,
  origin: string,
  toPerson: string,
  fromPerson:string,
  toPhoneNumber:string,
  fromPhoneNumber:string,
  weight: string,
  status: string,
}

const PARCEL_DATA: ParcelInfo[] = [
  {
    id: 1, 
    destination: 'Kisumu', 
    weight: '1.0079', 
    origin:'Nyeri',
    toPerson:'John Mwangi',
    fromPerson:'Ann Maina',
    toPhoneNumber:'0707070706',
    fromPhoneNumber:'0707070707',
    status:'In Transit'
  },
  {
    id: 2, 
    destination: 'Kisumu', 
    weight: '1.0079', 
    origin:'Nyeri',
    toPerson:'John Mwangi',
    fromPerson:'Ann Maina',
    toPhoneNumber:'0707070706',
    fromPhoneNumber:'0707070707',
    status:'In Transit'
  },
  {
    id: 3, 
    destination: 'Kisumu', 
    weight: '1.0079', 
    origin:'Nyeri',
    toPerson:'John Mwangi',
    fromPerson:'Ann Maina',
    toPhoneNumber:'0707070706',
    fromPhoneNumber:'0707070707',
    status:'In Transit'
  },
  {
    id: 4, 
    destination: 'Kisumu', 
    weight: '1.0079', 
    origin:'Nyeri',
    toPerson:'John Mwangi',
    fromPerson:'Ann Maina',
    toPhoneNumber:'0707070706',
    fromPhoneNumber:'0707070707',
    status:'In Transit'
  },
  {
    id: 5, 
    destination: 'Kisumu', 
    weight: '1.0079', 
    origin:'Nyeri',
    toPerson:'John Mwangi',
    fromPerson:'Ann Maina',
    toPhoneNumber:'0707070706',
    fromPhoneNumber:'0707070707',
    status:'In Transit'
  }
  
];
@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css']
})

export class ParcelsComponent implements OnInit {
  parcels$ = this.store.pipe(select(fromParcel.getParcels));
  page:number=1;
  showing=false;
  constructor(
    private store: Store<fromParcel.AppState>,
    private router: Router,
    private actRoute: ActivatedRoute,
    private adminService: AdminServicesService
  ) { }
  displayedColumns: string[] = ['Id', 'destination', 'weight', 'origin','toPerson','fromPerson','toPhoneNumber','fromPhoneNumber','status'];
  dataSource = PARCEL_DATA;
  ngOnInit(): void {
    //this.dataSource=this.loadParcels()
    this.loadParcels()
    console.log(this.loadParcels())
  }
  onDelete(id: string) {
    this.store.dispatch(parcelActions.DeleteParcel({ id }));
    this.store.dispatch(parcelActions.LoadParcels());
    // this.adminService.deleteParcel(id)
  }
show=()=>{
  return this.showing=!this.showing
}
loadParcels() {
  this.store.dispatch(parcelActions.LoadParcels());
}
}
