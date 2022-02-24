import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../entities';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';

@Component({
  selector: 'app-top-header-menu',
  templateUrl: './top-header-menu.component.html',
  styleUrls: ['./top-header-menu.component.scss']
})
export class TopHeaderMenuComponent implements OnInit {
  isAuth:boolean = false;
  isOwner:boolean = false;
  isAdmin:boolean = false;
  fullName : string = '';
  userName: string = '';
  user:User=new User()

  constructor(
    private authService: AuthService,
    private userProfilService:UserProfilService,
    private router:Router
  ) { 
     
  }

  ngOnInit(): void {
    this.userProfilService.currentUser.subscribe((user:User)=>{
      console.log("user ",user)
      this.user=user;
    })
    this.authService.isLoggedIn.subscribe((isLoggin)=>{
      console.log("isAauth ",isLoggin)
      this.isAuth=isLoggin
    })

  }

  logout()
  {
    this.authService.logOut()
    this.router.navigate(["/login"])
  }
}
