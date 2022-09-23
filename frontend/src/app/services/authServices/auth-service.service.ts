import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegisterInterface,LoginInterface,LoggedInUserInterface } from 'src/app/interfaces/userInterface';

let t=localStorage.getItem('userToken')
const headers: HttpHeaders = new HttpHeaders({
  'Content-Type':  'application/json',
  'userToken': t?t:'',
});
const options = { headers: headers };
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  //baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }
  isLoggedIn:boolean=false;
  
//register service
  register(registerUser:RegisterInterface):Observable<{message:string,messageError:string,token:string,payload:string,userId:string}>{
    console.log(registerUser)
    return this.http.post<{message:string,messageError:string,token:string,payload:string,userId:string}>('http://localhost:8800/user/signup',registerUser)
  }

//login service
  login(loginUser:LoginInterface):Observable<LoggedInUserInterface>{
    console.log(t)
    return this.http.post<LoggedInUserInterface>('http://localhost:8800/user/login',loginUser,options)
 }
 isAuthenticated(){
  console.log(this.isLoggedIn,'yooo')
  const token=localStorage.getItem('userToken')
  if(token){
    this.isLoggedIn=true
  }else{
    this.isLoggedIn=false
  }
return this.isLoggedIn
}
}
