import { SecurityService } from './security.service';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app.user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;


  constructor( private securityService: SecurityService) {
    
  }

   login() {
     this.securityService.login(this.user).subscribe(
        resp => {this.securityObject = resp;}
     )
     console.log(this.securityObject);
   }
  ngOnInit() {
  }

}
