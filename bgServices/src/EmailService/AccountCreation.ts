import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'

dotenv.config()
import sendMail from '../Helpers/Email'
interface User{
    id:string
    firstName:string
    email:string
    issent:string
}


const SendEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const users:User[]= await(await pool.request().query(`
SELECT * FROM users WHERE issent='no'`)).recordset
 for(let user of users){
    
 console.log(user)
    ejs.renderFile('templates/registration.ejs',{firstName:user.firstName},async(error,data)=>{
        if(error){
            console.log(error)
        }else{
        let messageoption={
            from:process.env.EMAIL,
            to:user.email,
            subject:"Account Creation",
            html:data,
            attachments:[
                {
                    filename:'sendIT.text',
                    content:`Welcome ${user.firstName},you have successfully created an account`
                }
            ]
        }
        try {
            await sendMail(messageoption)
            await pool.request().query(`UPDATE users SET issent='yes' WHERE id='${user.id}'`)
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }}
    })

 }


}

export default SendEmails