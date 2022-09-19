import {Router} from 'express';
import { addParcel,checkParcelFee,getParcels,getParcel,getsenderParcels,getReceiverParcels ,softDeleteParcel} from '../Controllers/parcelController';
import { VerifyToken } from '../Middlewares/verifyTokens';

const routerParcels=Router();
routerParcels.post('/add',VerifyToken,addParcel)
routerParcels.post('/checkFee',VerifyToken,checkParcelFee)
routerParcels.get('/',VerifyToken,getParcels)
routerParcels.get('/:parcel_id',VerifyToken,getParcel)
routerParcels.get('/sent/:parcel_origin_phone',VerifyToken,getsenderParcels)
routerParcels.get('/received/:parcel_destination_phone',VerifyToken,getReceiverParcels)
routerParcels.delete('/delete/:parcel_id',VerifyToken,softDeleteParcel)
routerParcels.patch('/update',VerifyToken,addParcel)


export default routerParcels