import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UserComponent } from './user.component';

const routes: Routes = [{path:'', children:[
  {path:'user',component:UserComponent,canActivate: [LoginGuard]}
  

 ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
