//security.service.ts
import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app.user';
import { LOGIN_MOCKS } from './login-mocks';
import { Observable } from 'rxjs';
import { of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  
  constructor() { }

  logout(): void {
    this.resetSecurityObject;
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;

    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;

    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCategory = false;

    localStorage.removeItem("bearerToken");
    
  }

   login(entity:AppUser): Observable<AppUserAuth> {

    //initialize security object
    this.resetSecurityObject();
    
    //use object assign to update the current user
    //note dont create a new AppUserAuth object
    // since this destroys all references to the object

    Object.assign(this.securityObject,
      LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.userName.toLowerCase()));

      if (this.securityObject.userName !== "") {
        //store token into localstorage
        localStorage.setItem("bearerToken",
        this.securityObject.bearerToken);

      }
     
      return of<AppUserAuth>(this.securityObject);
   
  }
}

