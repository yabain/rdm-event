import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-newsfeed-list',
  templateUrl: './newsfeed-list.component.html',
  styleUrls: ['./newsfeed-list.component.scss']
})
export class NewsfeedListComponent implements OnInit {
  isAuth: boolean = false;
  isOwner: boolean = true;
  isAdmin: boolean = false;

  constructor(
    private isAuthService: AuthService
  ) { 
    this.isAuth = this.isAuthService.isAuth;
    // this.isOwner = true;
    this.isAdmin = this.isAuthService.isAdmin;
    this.isAdminer(this.isAdmin);
  }

  isAdminer(isAdmin : boolean){
    if (isAdmin){
      this.isOwner == true;
    }
  }

  ngOnInit(): void {
    this.isAdminer(this.isAdmin);
  }

}
