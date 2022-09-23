import {ParcelInterface,UpdateResponseInterface} from '../../app/interfaces/parcelInterface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  token=localStorage.getItem('userToken') as string
  baseUrl:string="http://localhost:8800/parcels"
  private subject=new Subject<string>()
  search$=this.subject.asObservable()
  search(txt:string){
    this.subject.next(txt)
  }
  constructor(private http :HttpClient) { }
  //get all parcels
  getParcels():Observable<ParcelInterface[]>{
    return this.http.get<ParcelInterface[]>(`${this.baseUrl}`,{
      headers:new HttpHeaders({
        token:this.token

      })
    })

  }
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
//add parcel
  addParcel(parcel:ParcelInterface):Observable<{message:string}>{
    //console.log('parcel',parcel)
    return this.http.post<{message:string}>(`${this.baseUrl}/add`,parcel)

  }
//get single parcel
  getParcel(parcel_id:string):Observable<ParcelInterface[]>{
    return this.http.get<ParcelInterface[]>(`${this.baseUrl}/${parcel_id}`)

  }
//delete parcel
  deleteParcel(parcel_id:string):Observable<{message:string}>{
    console.log(parcel_id)
    return this.http.delete<{message:string}>(`${this.baseUrl}/delete/${parcel_id}`)
  }
  //update parcel
  updateParcel(parcel:ParcelInterface):Observable<UpdateResponseInterface>{
    console.log(parcel);
    
    return this.http.patch<UpdateResponseInterface>(`${this.baseUrl}/deliver/${parcel.parcel_id}`,parcel)
  }
}
