import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
    selector:'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../authentication.component.css']
})
export class RegisterComponent {

    onRegister(form: NgForm) {
        if(form.invalid){
          return
        }
      }
}