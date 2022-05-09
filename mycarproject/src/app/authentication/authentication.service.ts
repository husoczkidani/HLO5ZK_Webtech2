import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, RouteReuseStrategy } from "@angular/router";
import { Subject } from "rxjs";
import { LoginData } from "./login.model";
import { RegisterData } from "./register.model";


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient,private router: Router){}

    getIsAuth() {
        return this.isAuthenticated;
    }
    
    getAuthStatusListnere() {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, username: string, password: string)
    {
        const registerData: RegisterData = {email, username, password };
        this.http
            .post('http://localhost:4000/app/register', registerData)
            .subscribe((response) => {
        console.log(response);
        this.login(username,password);
      });
    }

    login(username: string, password: string) {
        const loginData: LoginData = { username: username, password: password };
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
        this.http
        .post('http://localhost:4000/app/login', loginData )
            .subscribe((response) => {
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                this.router.navigate(['/']);
            }
        );
    }

    logout() {
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/login']);
      }
}