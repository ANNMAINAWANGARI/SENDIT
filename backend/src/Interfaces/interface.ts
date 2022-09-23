export interface User{
    id:string
    email:string
    role:string
    firstName:string
    password:string
}
export interface Data{
    id: string,
    email: string,
    role:string
    iat: number,
    exp: number
  }