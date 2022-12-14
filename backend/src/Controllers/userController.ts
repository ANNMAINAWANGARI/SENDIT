import { sqlConfig } from "../Config/config";
import {v4 as uid} from 'uuid';
import mssql from 'mssql';
import bcrypt from 'bcrypt';
import {Request,Response} from 'express';
import {UserSchema,UserSchema2} from '../HelperFunctions/userValidator'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Data, User} from '../Interfaces/interface';
dotenv.config()
interface Extended extends Request{
    info?:Data
}
interface CustomRequest extends Request{
    body:{
        email:string
        password:string
        firstName:string
        lastName:string
    }
}

export const RegisterUser=async(req:CustomRequest,res:Response)=>{
    try{
        const pool=await mssql.connect(sqlConfig)
            const id =uid()
            const {email, password, firstName,lastName}= req.body
            const {error , value}= UserSchema.validate(req.body)
            if(error){
                return res.json({error:error.details[0].message})
            }
            const hashedpassword = await bcrypt.hash(password,10)
            await pool.request()
            . input('id', mssql.VarChar, id)
            . input('email', mssql.VarChar, email)
            .input('firstName', mssql.VarChar, firstName)
            .input('lastName', mssql.VarChar, lastName)
            . input('password', mssql.VarChar, hashedpassword)
            .execute('insertUser')
     
            const user:User[]=await( await pool.request().input('email', mssql.VarChar, email).execute('getUser')).recordset

                  const payload = user.map(item=>{
                    const{password, ...rest}=item
                    return rest
                })      
            const token =jwt.sign(payload[0] ,process.env.KEY as string,{expiresIn:'36000000s'})
            res.status(200).json({
                message:'Registered successfully',
                token,
                payload:payload[0].role,
                userId:payload[0].id
            })

    
            //res.status(400).json({message:'Bad Gateway'})
            //res.json({message:'You have registered successfully'})
    }catch(error:any){
        res.json({messageError: error.code})
    }
    }


    export const loginUser=async(req:CustomRequest,res:Response)=>{
        try{
            const {email, password }= req.body
            const pool =await mssql.connect(sqlConfig)
            const {error , value}= UserSchema2.validate(req.body)
            const checked_token = req.headers['usertoken'] as string
            if(error){
                return res.json({error:error.details[0].message})
                        }
            const user:User[]=await( await pool.request()
                  .input('email', mssql.VarChar, email)
                  .execute('getUser')).recordset
        
        
                  if(!user[0]){
                    return res.json({message:'User Not Found'})
                  }
                  const validPassword = await bcrypt.compare(password,user[0].password)
                  if(!validPassword){
                    return res.json({message:'Wrong password'})
                  }
                  const payload = user.map(item=>{
                    const{password, ...rest}=item
                    return rest
                })
                console.log(req.headers)
                if(!checked_token){
                    const token =jwt.sign(payload[0] ,process.env.KEY as string,{expiresIn:'360000000s'})
                res.json({
                    user:{
                        role:payload[0].role,
                        email:payload[0].email,
                        firstName:payload[0].firstName,
                        userId:payload[0].id
                    },
                    message:'Logged in',
                    token,
                })
                }else{
                    res.json({
                        message:'You are logged in successfully'
                    })
                }
                
        }catch(err){
            res.json({err})
        }
        }