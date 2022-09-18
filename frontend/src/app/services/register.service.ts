import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterInterface } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl="localhost:8800/user"
  constructor(private http:HttpClient) { }

  signUp(client:RegisterInterface):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}/signup`, client)
  }
}
