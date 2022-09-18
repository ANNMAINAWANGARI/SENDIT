import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'

dotenv.config()
import sendMail from '../Helpers/Email'
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


const SenderEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const parcels:Parcel[]= await(await pool.request().query(`
SELECT * FROM ParcelsTable INNER JOIN users ON ParcelsTable.user_id=users.id WHERE destination_issent='no' AND origin_issent='no'`)).recordset
 for(let parcel of parcels){
    
 console.log(parcel)
    ejs.renderFile('templates/parcelSendingUpdate.ejs',{firstName:parcel.firstName,status:parcel.parcel_status,receivingNumber:parcel.parcel_origin_phone},async(error,data)=>{
        if(error){
            console.log(error)
        }else{
        let messageoption={
            from:process.env.EMAIL,
            to:parcel.email,
            subject:"Parcel Status Update",
            html:data,
            attachments:[
                {
                    //filename:'sendIT.text',
                    //content:`Welcome ${parcel.firstName},you have successfully created an account`
                }
            ]
        }
        try {
            await sendMail(messageoption)
            await pool.request().query(`UPDATE ParcelsTable SET origin_issent='yes',destination_issent='yes' WHERE parcel_id='${parcel.parcel_id}'`)
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }}
    })

 }


}

export default SenderEmails