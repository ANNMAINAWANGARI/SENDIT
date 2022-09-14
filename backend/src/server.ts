import express ,{json,Request,Response,NextFunction}from 'express';
import cors from 'cors';
import userRouter from './Routes/userRoutes';

const app=express();
app.use(json());
app.use(cors());
const PORT = 8800;


app.use('/user',userRouter)

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({message:err.message})
})
app.listen(8800,()=>{console.log(`App running on port ${PORT}`)})