import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:object;

  constructor(
      public toastr:ToastsManager,
      vcr:ViewContainerRef,
      private authService:AuthService,
      private router:Router
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      }
    )
  }

}
