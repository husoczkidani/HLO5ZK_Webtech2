import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthenticationService } from "../authentication.service";

@Component({
    selector:'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../authentication.component.css']
})
export class RegisterComponent {
  constructor(public authenticationService: AuthenticationService) {}

    onRegister(form: NgForm) {
        if(form.invalid){
          return
        }
        this.authenticationService.createUser(form.value.email, form.value.username, form.value.password);
      }
}