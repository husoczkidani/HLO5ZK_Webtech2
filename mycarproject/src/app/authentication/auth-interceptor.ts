import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{
  constructor(private authenticationService: AuthenticationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const token = this.authenticationService.getToken();
    const authenticationRequest = req.clone({
      headers: req.headers.set('Authorization',"Bearer "+ token)
    });
    
    return next.handle(authenticationRequest);
  }

}
