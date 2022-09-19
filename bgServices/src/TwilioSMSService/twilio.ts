//import twilio from 'twilio';
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'

dotenv.config()


interface Parcel{
    parcel_id:string
    user_id:string
    parcel_type:string
    parcel_destination:string
    parcel_origin:string
    parcel_destination_phone:string
    parcel_origin_phone:string
    parcel_status:string
    firstName:string
    email:string//the one sending the parcel
    //issent:string
}
let sid=process.env.ACC_SID;
let auth_token=process.env.AUTH_TOKEN;
let twilio=require('twilio')(sid,auth_token);
const SendSMS=async()=>{
    
const pool = await mssql.connect(sqlConfig)
const parcels:Parcel[]= await(await pool.request().query(`
SELECT * FROM ParcelsTable INNER JOIN users ON ParcelsTable.user_id=users.id WHERE destination_phone_issent='no'`)).recordset

for(let parcel of parcels){
    twilio.messages
    .create({
        from:process.env.TWILIO_NUMBER,
        to:`+254${parcel.parcel_destination_phone}`,
        body:`
        Hello ${parcel.firstName}, you have received a parcel from ${parcel.parcel_origin_phone} which is currently ${parcel.parcel_status}. You will receive an update when the parcel reaches its destination.`
    })
    .then(()=> pool.request().query(`UPDATE ParcelsTable SET destination_phone_issent='yes' WHERE parcel_id='${parcel.parcel_id}'`))
    .catch((err:Error)=>console.log(err))
}
}
export default SendSMS