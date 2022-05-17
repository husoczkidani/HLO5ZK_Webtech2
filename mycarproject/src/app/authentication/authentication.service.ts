import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoginData } from "./login.model";
import { RegisterData } from "./register.model";


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();
    private token: string;
    private tokenTimer: any;    

    constructor(private http: HttpClient,private router: Router){}

    getIsAuth() {
        return this.isAuthenticated;
    }
    
    getAuthStatusListnere() {
        return this.authStatusListener.asObservable();
    }

    getToken() {
        return this.token;
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
          return null;
        }
    
        return {
          token: token,
          expirationDate: new Date(expirationDate),
        };
    }

    private setAuthTimer(duration: number){
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
    }

    createUser(email: string, username: string, password: string)
    {
        const registerData: RegisterData = { email: email, username: username, password: password };
        this.http
            .post('http://localhost:4000/app/register', registerData)
            .subscribe((response) => {
        console.log(response);
        this.login(username,password);
      });
    }

    login( username: string, password: string) {
        const authData: LoginData = { username: username, password: password };
        this.http
          .post<{ token: string; expiresIn: number }>(
            'http://localhost:4000/app/login',
            authData
          )
          .subscribe((response) => {
            const token = response.token;
            this.token = token;
            if (token) {
              const expiresInDuration = response.expiresIn;
              this.setAuthTimer(expiresInDuration);
              this.isAuthenticated = true;
              this.authStatusListener.next(true);
              const now = new Date();
              const expirationDate = new Date(
                now.getTime() + expiresInDuration * 1000
              );
              this.saveAuthData(token, expirationDate);
              console.log(expirationDate);
              this.router.navigate(['/']);
            }
          });
    }

    logout() {
        this.token = "";
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/login']);
        this.clearAuthData();
        clearTimeout(this.tokenTimer);
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation){
            this.router.navigate(['/user/signup']);
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime()-now.getTime();
        if(expiresIn > 0){
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }
    
      
    private saveAuthData(toke: string, expirationDate: Date) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }
    
    private clearAuthData() {
        localStorage.removeItem('token'), localStorage.removeItem('expiration');
    }
}