import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthenticationService } from "../authentication.service";

@Component({
    selector:'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../authentication.component.css']
})
export class LoginComponent {
    constructor(public authenticationService: AuthenticationService) {}

    onLogin(form: NgForm) {
        if(form.invalid){
          return
        }
        this.authenticationService.login(form.value.username, form.value.password);
      }
}