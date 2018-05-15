import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable()
export class AuthGuardService {

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }
  
  canActivate(){
      if(this.authService.loggedIn()){
          return true;
      }else{
          this.router.navigate(['/login']);
          return false;
      }
  }
}
