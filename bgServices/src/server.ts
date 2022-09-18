import express from 'express'
//import cron from 'node-cron'
//import SendProjectEmails from './EmailService/ProjectServices'
import SendEmails from './EmailService/AccountCreation'
import SenderEmails from './EmailService/ParcelUpdateService'
const app= express()

const run =async()=>{
  await SendEmails()
  await SenderEmails()
  //await SendProjectEmails()
}
run()


app.listen(6000, ()=>{
    console.log('App is Running!!');
    
})