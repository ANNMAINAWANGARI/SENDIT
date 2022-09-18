import {Router} from 'express';
import { addParcel,checkParcelFee,getParcels,getParcel,getsenderParcels,getReceiverParcels } from '../Controllers/parcelController';


const routerParcels=Router();
routerParcels.post('/add',addParcel)
routerParcels.post('/checkFee',checkParcelFee)
routerParcels.get('/',getParcels)
routerParcels.get('/:parcel_id',getParcel)
routerParcels.get('/sent/:parcel_origin_phone',getsenderParcels)
routerParcels.get('/received/:parcel_destination_phone',getReceiverParcels)
//routerParcels.get('/:parcel_id')


//routerParcels.patch('/deliver/:parcel_id',updateDelivered)
//routerParcels.patch ('/delete/:parcel_id',softDeleteParcel)

export default routerParcels