import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
    selector:'app-header',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isAuthenticated = false;
    private authListnerSubs :Subscription;
    
    constructor(private authenticationService: AuthenticationService){}

    ngOnInit(): void {
        this.isAuthenticated = this.authenticationService.getIsAuth();
        this.authListnerSubs = this.authenticationService.getAuthStatusListnere().subscribe(isAuthenticated =>{
            this.isAuthenticated = isAuthenticated;
        })
    }

    ngOnDestroy(): void {
        this.authListnerSubs.unsubscribe();
    }

    onLogout(){
        this.authenticationService.logout();
    }
}