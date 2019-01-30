import { Router, ActivatedRoute } from '@angular/router';
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
  returnURL: string;


  constructor( private securityService: SecurityService,
               private route: ActivatedRoute,
               private router: Router) { } 

   login() {
     this.securityService.login(this.user).subscribe(
        resp => {
          this.securityObject = resp;
        if(this.returnURL) {
          this.router.navigateByUrl(this.returnURL);
        }
      },
      () => {
        //initialize securityobject to display error message
        this.securityObject = new AppUserAuth();
      }
     );
     console.log(this.securityObject);
     
   }

  ngOnInit() {
    this.returnURL = this.route.snapshot.queryParamMap.get('returnUrl');
  }

}
