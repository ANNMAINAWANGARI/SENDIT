export interface RegisterInterface{
    
    firstName:string
    lastName:string
    email:string
    password:string
    error:string
    message:string
    

}

export interface LoginInterface{
    email:string
    password:string
}

export interface LoggedInUserInterface {
user:{
    email:string
    role:string, 
    firstName:string,
    userId:string 
     }
token?:string,
message:string
}