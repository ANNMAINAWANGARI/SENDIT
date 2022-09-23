import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Observable} from 'rxjs';
import { ParcelInterface } from 'src/app/interfaces/parcelInterface';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService) { }
result$!:ParcelInterface[];
filteredText:string='';
  ngOnInit(): void {
    this.userService.getParcels().subscribe((res)=>{
      console.log(res)
     this.result$=res
    // this.result$= res.filter(re=>re.user_id==localStorage.getItem('userId'))
      
    })
    console.log(this.result$)
    //subscription.unsubscribe()
  }

}
