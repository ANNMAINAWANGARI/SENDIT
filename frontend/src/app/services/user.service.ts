import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ParcelInterface,UpdateResponseInterface} from '../../app/interfaces/parcelInterface'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  token=localStorage.getItem('userToken') as string
  baseUrl:string="http://localhost:8800/parcels"
  constructor(private http :HttpClient) { }

  getParcels():Observable<ParcelInterface[]>{
    return this.http.get<ParcelInterface[]>(`${this.baseUrl}`,{
      headers:new HttpHeaders({
        token:this.token

      })
    })

  }


  getDestinationParcels(parcel_destination_phone:string):Observable<ParcelInterface[]>{
    console.log(parcel_destination_phone)
    return this.http.get<ParcelInterface[]>(`${this.baseUrl}/received/${parcel_destination_phone}`,{
      headers:new HttpHeaders({
        token:this.token

      })
    })

  }


  createOrder(order: ParcelInterface): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/parcels/add`, order,
      {
        headers: new HttpHeaders({ token: this.token }),
      }
    );
  }
}
