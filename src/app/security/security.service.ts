//security.service.ts
import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app.user';
//import { LOGIN_MOCKS } from './login-mocks';
import { Observable, of, fromEventPattern } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';


const API_URL = "http://localhost:5000/api/security/";

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  
  constructor(private http: HttpClient) {}

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
    
    return this.http.post<AppUserAuth>(API_URL + "login",
        entity, httpOptions).pipe(
          tap(resp => {
            Object.assign(this.securityObject, resp);
            localStorage.setItem("bearerToken", this.securityObject.bearerToken);
          }));
     
      
  }
}

