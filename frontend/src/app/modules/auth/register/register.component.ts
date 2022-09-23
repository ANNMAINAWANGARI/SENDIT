import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  form!: FormGroup;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  //success!:boolean;
  //message!:string;
  successMessage !: string;
  errorMessage!:string
  sub!:Subscription

  constructor(private auth:AuthServiceService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        this.checkSpecialCharacters,
        this.checkNumber,
        this.checkCapital,
      ]),
    });
  }


  checkSpecialCharacters(
    control: FormControl
  ): { [s: string]: boolean } | null {
    const value = control.value;
    const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]+/.test(value);
    return !special ? { special: true } : null;
  }
  checkNumber(control: FormControl): { [s: string]: boolean } | null {
    const value = control.value;
    const number = /[0-9]+/.test(value);
    return !number ? { number: true } : null;
  }
  checkCapital(control: FormControl): { [s: string]: boolean } | null {
    const value = control.value;
    const capital = /[A-Z]+/.test(value);
    return !capital ? { capital: true } : null;
  }

  checkMinimum(): boolean {
    const result = this.form.get('password')?.errors!['minlength'] as {
      actualLength: number;
      requiredLength: number;
    };
    if (result.actualLength < result.requiredLength) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.sub = this.auth.register(this.form.value).subscribe(val => {
      console.log('val',val)
      if(val.message){
        this.successMessage=val.message;
        localStorage.setItem("userToken", val.token);
        localStorage.setItem("userRole", val.payload);
        localStorage.setItem("userId", val.userId);
        //this.auth.isLoggedIn=true;
        this.form.reset()
        if(val.payload=='user'){
          this.router.navigate(['/user/user'])
        }
        
      }
      if(val.messageError){
        console.log(val.messageError)
        this.errorMessage=val.messageError;
      }

    }, error=>{
      this.errorMessage=error.messageError;
      console.log(error);
      
    })
    
  }


  goToLogin(){
    this.router.navigate(['/auth/login'])
  }

  ngOnDestroy(): void {
  
    this.sub.unsubscribe()
  }
}
