import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  onLogout(event){
    event.preventDefault()
    this.authService.logout();
    this.toastr.success("You are successfully logout", 'Success!');
    this.router.navigate(["login"]);
    return false;
  }

}
