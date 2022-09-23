import * as parcelActions from './parcel.action';
import { ParcelInterface } from 'src/app/interfaces/parcelInterface';
import {LoggedInUserInterface} from 'src/app/interfaces/userInterface';
import * as fromRoot from '../../.././state/app-state'
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { Actions } from "@ngrx/effects"

//store state
export interface ParcelState{
    parcel_id:string
    parcels:ParcelInterface[]
    addParcelMessage:string
    updateParcelMessage:string
    deleteParcelMessage:string
    parcelError:string
    error:string
    //addClientmessage:string
    clients:LoggedInUserInterface[]
    clientError:string
}

export interface AppState extends fromRoot.AppState{
    parcels:ParcelState
}

//initialState
export const initialState:ParcelState= {
    parcel_id:'',
    parcels:[],
    addParcelMessage:"",
    updateParcelMessage:"",
    deleteParcelMessage:"",
    parcelError:"",
    error:"",
    //addClientmessage:"",
    clients:[],
    clientError:""
}



const getParcelFeatureState=createFeatureSelector<ParcelState>(
    "parcels"
)
export  const getParcels=createSelector(
    getParcelFeatureState,
    (state:ParcelState)=>state.parcels
)
export  const getparcel_id=createSelector(
    getParcelFeatureState,
    (state:ParcelState)=>state.parcel_id
)
export  const getParcel =createSelector(
    getParcelFeatureState,
    getparcel_id,
    (state,id )=>state.parcels.find(parcel=>parcel.parcel_id==id)
)
export  const getError=createSelector(
    getParcelFeatureState,
    (state:ParcelState)=>state.error
)
export const getClients = createSelector(
    getParcelFeatureState,
    (state) => state.clients
  );
//reducers

export const parcelReducer=createReducer(initialState,
    on(parcelActions.LoadParcelsSuccess,(state,action):ParcelState=>{
        return {...state,parcels:action.parcels}
    }),
    on(parcelActions.LoadParcelsFail,(state,action):ParcelState=>{
        return {...state,error:action.error}
    }),
    on(parcelActions.AddParcelSuccess,(state,action):ParcelState=>{
        return {...state,addParcelMessage:action.addParcelMessage}
    }),
    on(parcelActions.AddParcelFail,(state,action):ParcelState=>{
        return {...state,error:action.error}
    }),
    on(parcelActions.SelectedId,(state,action):ParcelState=>{
        return {...state,parcel_id:action.id}
    }),
    on(parcelActions.DeleteParcelSuccess,(state,action):ParcelState=>{
        return {...state,deleteParcelMessage:action.deleteParcelMessage}
    }),
    on(parcelActions.DeleteParcelFail,(state,action):ParcelState=>{
        return {...state,error:action.error}
    }),
    on(parcelActions.UpdateParcelSuccess,(state,action):ParcelState=>{
        return {...state,updateParcelMessage:action.updateParcelMessage}
    }),
    on(parcelActions.UpdateParcelFail,(state,action):ParcelState=>{
        return {...state,error:action.error}
    }),
    // on(parcelActions.RegisterClientSuccess,(state,action):ParcelState=>{
    //     return{...state, addClientmessage:action.addClientMessage}
    // }),on(parcelActions.RegisterClientFailure,(state,action):ParcelState=>{
    //     return{...state, error:action.error}
    
    // }),
    on(parcelActions.LoadClientsSuccess, (state, action): ParcelState => {
      return { ...state, clients: action.clients};
    }),
    on(parcelActions.LoadClientsFailure, (state, action): ParcelState => {
      return { ...state, clientError: action.error };
    })
    
    )