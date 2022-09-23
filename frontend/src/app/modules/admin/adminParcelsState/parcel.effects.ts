import { Injectable } from '@angular/core';
import {  Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators'
import { Action } from '@ngrx/store';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { AdminServicesService } from 'src/app/services/admin-services.service';
import * as ParcelActions from './parcel.action'
import { ParcelInterface } from 'src/app/interfaces/parcelInterface';

@Injectable()
export class ParcelEffect {
    constructor(private actions$: Actions, private adminService: AdminServicesService,private authService:AuthServiceService) {}
    loadParcel=createEffect(()=>{
        return this.actions$.pipe(
          ofType(ParcelActions.LoadParcels),
          concatMap(()=>this.adminService.getParcels().pipe(map(parcels=>(ParcelActions.LoadParcelsSuccess({parcels})),
          catchError(error=> of(ParcelActions.LoadParcelsFail({error:error}))))))
        )
       })

       addParcel=createEffect(()=>{
        return this.actions$.pipe(
          ofType(ParcelActions.AddParcel),
          mergeMap(action=>this.adminService.addParcel(action.newParcel).pipe(
            map(res=>ParcelActions.AddParcelSuccess({addParcelMessage:res.message})),
            catchError(error=> of(ParcelActions.AddParcelFail({error:error})))
    
          ))
        )
       })

       deleteParcel = createEffect(()=>{
        return this.actions$.pipe(
          ofType(ParcelActions.DeleteParcel),
          mergeMap(action=>this.adminService.deleteParcel(action.id).pipe(
            map(res=>ParcelActions.DeleteParcelSuccess({deleteParcelMessage:res.message})),
            catchError(error=>of(ParcelActions.DeleteParcelFail({error:error.message})))
          ))
        )
      })
      updateParcel=createEffect(()=>{
        return this.actions$.pipe(
          ofType(ParcelActions.UpdateParcel),
          mergeMap(action=>this.adminService.updateParcel(action.updatedParcel).pipe(
            map(res=>ParcelActions.UpdateParcelSuccess({updateParcelMessage:res.message})),
            catchError(error=> of(ParcelActions.UpdateParcelFail({error:error})))
    
          ))
        )
       })

       
}