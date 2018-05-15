import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { animate } from '@angular/animations';
import { AuthService } from '../service/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  onSubmitRegistration(form:NgForm){
    const user = form.value;
    const name:String = user.name;
    const username:String = user.username;
    const email:String = user.email;
    const password:String = user.password;

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.toastr.success(data.msg, 'Success!');
        this.router.navigate(['/login'])
      }else{
        this.toastr.error(data.msg, 'Oops!');
        this.router.navigate(['/register'])
      }
    });
  }
}
