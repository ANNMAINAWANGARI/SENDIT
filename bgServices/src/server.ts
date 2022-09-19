import express from 'express'
import cron from 'node-cron'
import SendEmails from './EmailService/AccountCreation'
import SenderEmails from './EmailService/ParcelUpdateService'
import SendSMS from './TwilioSMSService/twilio'
const app= express()

const run =async()=>{
  cron.schedule("*/5 * * * * *", async () => {
    await SendEmails()
    await SenderEmails()
    await SendSMS()
  })
 
  
}
run()


app.listen(6000, ()=>{
    console.log('App is Running!!');
    
})