import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css','../../../custom-theme.scss']
})
export class SharedComponent implements OnInit {
//state!:boolean;
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  }
state=this.authService.isLoggedIn
}
