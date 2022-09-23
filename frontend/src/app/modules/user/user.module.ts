import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {MatIconModule} from '@angular/material/icon';
import { SearchPipe } from 'src/app/pipes/search.pipe';

@NgModule({
  declarations: [
    UserComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatIconModule
  ]
})
export class UserModule { }
