import { Component, OnInit } from '@angular/core';

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
  showing=false;
  constructor() { }
  displayedColumns: string[] = ['Id', 'destination', 'weight', 'origin','toPerson','fromPerson','toPhoneNumber','fromPhoneNumber','status'];
  dataSource = PARCEL_DATA;
  ngOnInit(): void {
  }
show=()=>{
  return this.showing=!this.showing
}
}
