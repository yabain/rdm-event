import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-top-header-menu',
  templateUrl: './top-header-menu.component.html',
  styleUrls: ['./top-header-menu.component.scss']
})
export class TopHeaderMenuComponent implements OnInit {
  @Input()
  isAuth:boolean = false;
  isOwner:boolean = false;
  isAdmin:boolean = false;

  constructor(
    private isAuthService: AuthService
  ) { 
    this.isAuth = this.isAuthService.isAuth;
    // this.isOwner = true;
    this.isAdmin = this.isAuthService.isAdmin;
  }

  ngOnInit(): void {
  }
}
