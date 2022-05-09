import { Injectable } from "@angular/core";
import { Router, RouteReuseStrategy } from "@angular/router";
import { Subject } from "rxjs";
import { LoginData } from "./login.model";
import { RegisterData } from "./register.model";


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();

    constructor(private router: Router){}

    getIsAuth() {
        return this.isAuthenticated;
    }
    
    getAuthStatusListnere() {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, username: string, password: string, repassword: string)
    {
        const registerData: RegisterData = {email, username, password, repassword };
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
    }

    login(username: string, password: string) {
        const loginData: LoginData = { username: username, password: password };
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
    }

    logout() {
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/login']);
      }
}