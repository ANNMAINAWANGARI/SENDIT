import { Router } from "express";
import { loginUser, RegisterUser } from "../Controllers/userController";
import { VerifyToken } from "../Middlewares/verifyTokens";
const userRouter=Router();


userRouter.post('/login',loginUser)
userRouter.post('/signup',RegisterUser)


export default userRouter;