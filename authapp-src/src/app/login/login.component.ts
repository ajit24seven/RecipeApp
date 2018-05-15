import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { animate } from '@angular/animations';
import { AuthService } from '../service/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
      public toastr:ToastsManager,
      vcr:ViewContainerRef,
      private authService:AuthService,
      private router:Router
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }
  
  onSubmitLogin(form:NgForm){
    const user = form.value;
    const username:String = user.username;
    const password:String = user.password;
   
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user)
        this.toastr.success("User logged In", 'Success!');
        this.router.navigate(["/home"]);
      }else{
        this.toastr.error(data.msg, 'Oops!!');
      }
    })
  }
}
