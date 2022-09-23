import { Request, RequestHandler, Response } from "express"
import dotenv from 'dotenv'
//import Buffer from 'buffers'

import { ParcelSchema } from "../HelperFunctions/parcelValidator"
import {v4 as uid}  from 'uuid'
import Connection from "../HelperFunctions/dbHelpers"

const db=new Connection()
dotenv.config()
interface ExtendedRequest extends Request{
    body:{
        parcel_id:string,
        parcel_type:string
        parcel_destination:string
        parcel_origin:string
        parcel_destination_phone:string
        parcel_origin_phone:string
        parcel_weight:number
        parcel_status:string
        price:number
        user_id:string

    }
}
let price:number;
export const checkParcelFee=async(req:ExtendedRequest,res:Response)=>{
    try{
        
        const{parcel_weight}=req.body
        const {error , value}= ParcelSchema.validate(req.body)
            if(error){
                return res.json({error:error.details[0].message})
            }
        let checkFee=new Promise(function(resolve,reject){
            if(Number(parcel_weight)>=0 && Number(parcel_weight)<=10){
              price = 1;
              resolve(price);
            }else if(Number(parcel_weight)>=11 && Number(parcel_weight)<=50){
              price=2;
              resolve(price);
            }else if(Number(parcel_weight)>=51 && Number(parcel_weight)<=100){
              price=3;
              resolve(price);
            }else{
                const parcelMessage='Cannot send parcel of over 100kgs';
                reject(res.json(parcelMessage));
            }
        })
        checkFee
        .then((data) => {
          return  res.status(201).json(data)

        })
        .catch(err => res.json(err));
    }catch(err){res.json(err)}
}

export const stkPush=async(req:ExtendedRequest,res:Response)=>{
    try{
        const{parcel_destination_phone}=req.body
        const date = new Date();
        const timestamp =
          date.getFullYear() +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          ("0" + date.getDate()).slice(-2) +
          ("0" + date.getHours()).slice(-2) +
          ("0" + date.getMinutes()).slice(-2) +
          ("0" + date.getSeconds()).slice(-2);

          const shortCode= process.env.MPESA_PAYBILL;
          const passkey = process.env.MPESA_PASSKEY;
          const callbackurl = process.env.CALLBACK_URL;

          const password = Buffer.from (shortCode as string+ passkey + timestamp).toString(
            "base64"
          );
        
    }catch(err){
        console.log(err)
    }
    }


export const addParcel=async(req:ExtendedRequest,res:Response)=>{
    try {
        const id=uid();
        const parcel_id=id;
        const{parcel_type,parcel_destination,parcel_origin,parcel_destination_phone,parcel_origin_phone,parcel_weight,parcel_status,user_id}=req.body
        const {error , value}= ParcelSchema.validate(req.body)
            if(error){
                return res.json({error:error.details[0].message})
            }
    
        
        
        db.exec('insertUpdateParcel',{ parcel_id,parcel_type,parcel_destination,parcel_origin,parcel_destination_phone,parcel_origin_phone,parcel_weight,parcel_status,price,user_id})
        res.status(201).json({message:"Parcel Added Successfully!!"})
    } catch (error:any) {
        res.json({error})
    }
}
//get all parcels
export const getParcels:RequestHandler=async(req,res)=>{
    try {
        const parcels=(await db.exec('getParcels'))
        res.json(parcels.recordset)
        
    } catch(error:any){
        res.json({error})
        
    }
}
//get single parcel
export const getParcel:RequestHandler<{parcel_id:string}>=async(req,res)=>{
    try {
        const parcel_id=req.params.parcel_id
        const {recordset}=await db.exec('getParcel',{parcel_id})
        if(!recordset[0]){
            res.json({message:"Parcel Not Found!"})
        }
        else{
            res.status(201).json(recordset)
        }
        
    } catch (error) {
        res.json({error})
        
    }
}
//get sent parcels
export const getsenderParcels:RequestHandler=async(req,res)=>{
    try {
    const parcel_origin_phone=req.params.parcel_origin_phone
    const {recordset}=await db.exec('getSenderParcels',{parcel_origin_phone})
    console.log(parcel_origin_phone)
    if(!recordset[0]){
        res.json({message:"You have not sent any parcels"})
    }
    else{
        console.log(parcel_origin_phone)
        res.status(201).json(recordset)
    }
        
    } catch (error) {
    res.json({error})
        
    }
    
    }

    //get received parcels
export const getReceiverParcels:RequestHandler=async(req,res)=>{
    try {
    const parcel_destination_phone=req.params.parcel_destination_phone
    const {recordset}=await db.exec('getReceiverParcels',{parcel_destination_phone})
    
    if(!recordset[0]){
        res.json({message:"You have not received any parcels"})
        
    }else{
        res.json(recordset)
    }
  
    } catch (error) {
    res.json({error})
        
    }
    }

    //soft delete a parcel
    export const softDeleteParcel:RequestHandler<{parcel_id:string}>=async(req,res)=>{
        try {
            let parcel_id=req.params.parcel_id
           

            const {recordset}=await db.exec('getParcel',{parcel_id})
            
            
            if(!recordset[0]){
                res.status(404).send("Parcel Not Found!")
            }else{
                await db.exec('deleteParcel',{parcel_id})
                res.status(200).json({message:'Parcel Deleted Successfully!'})
    
            }
    
            
        } catch (error) {
            res.status(400).send("An Error Occurred!")
            
        }
    
    }