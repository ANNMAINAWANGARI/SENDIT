import { Request, RequestHandler, Response } from "express"


export const stkPush=async(req:Request,res:Response)=>{
try{
    const{parcel_destination_phone}=req.body
}catch(err){
    console.log(err)
}
}