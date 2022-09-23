import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { LoginInterface } from 'src/app/interfaces/userInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{
  email!: string;
  password!: string;
  subscription!: Subscription;
  @ViewChild('loginForm') loginForm!: NgForm;
  constructor(private router: Router, private authService: AuthServiceService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  onLogin() {
    
    if (this.loginForm.valid) {
      const client= this.loginForm.value;
      this.subscription=this.authService.login(client).subscribe((response) => {
      console.log(response)
        response.token ? localStorage.setItem('userToken', response.token) : '';
        response.user.role ? localStorage.setItem('userRole', response.user.role) : '';
        response.user.firstName ? localStorage.setItem('firstName', response.user.firstName) : '';
        response.user.email ? localStorage.setItem('email', response.user.email) : '';


        this.router.navigate(
          response.user.role==='admin'?['/admin/admin']:response.user.role==='user'?['/user/user']:['/']
        )

      
      });
     
     
    }
  }
  
}
