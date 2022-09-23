import { Action, createAction, props } from '@ngrx/store';
import { ParcelInterface } from 'src/app/interfaces/parcelInterface';
import {LoggedInUserInterface} from 'src/app/interfaces/userInterface';



//select
export const SelectedId = createAction(
    'SelectedId',
    props<{ id: string }>()
  );
//add parcel action
export const AddParcel = createAction(
    'AddParcel',
    props<{ newParcel: ParcelInterface }>()
  );
  export const AddParcelSuccess = createAction(
    'AddParcelSuccess',
    props<{ addParcelMessage: string }>()
  );
  export const AddParcelFail = createAction(
    'AddParcelFail',
    props<{ error: string }>()
  );
  //load all parcels action
  export const LoadParcels = createAction('LoadParcels');
  export const LoadParcelsSuccess = createAction(
    'LoadParcelsSuccess',
    props<{ parcels: ParcelInterface[] }>()
  );
  export const LoadParcelsFail = createAction(
    'LoadParcelsFail',
    props<{ error: string }>()
  );

  //update parcel action
  export const UpdateParcel = createAction(
    'UpdateParcel',
    props<{ updatedParcel: ParcelInterface }>()
  );
  export const UpdateParcelSuccess = createAction(
    'UpdateParcelSuccess',
    props<{ updateParcelMessage: string }>()
  );
  export const UpdateParcelFail = createAction(
    'UpdateParcelFail',
    props<{ error: string }>()
  );
  //Delete parcel action
  export const DeleteParcel = createAction(
    'DeleteParcel',
    props<{ id: string }>()
  );
  export const DeleteParcelSuccess = createAction(
    'DeleteParcelSuccess',
    props<{ deleteParcelMessage: string }>()
  );
  export const DeleteParcelFail = createAction(
    'DeleteParcelFail',
    props<{ error: string }>()
  );
  //get all users action
  export const LoadClients = createAction('LoadClients');
export const LoadClientsSuccess = createAction(
  'LoadClientsSuccess',
  props<{ clients: LoggedInUserInterface[] }>()
);
export const LoadClientsFailure = createAction(
  'LoadClientsFailure',
  props<{ error: string }>()
);