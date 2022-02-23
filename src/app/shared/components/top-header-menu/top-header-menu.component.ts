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
  @Input()
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
    let user = JSON.parse(localStorage.getItem('data_rdm_event'));
    this.isAuth = user.auth_data.isLoggedIn;
    this.fullName = user.user_profil.fullname;
    console.log('fullname: ',this.fullName)
    this.userName = user.user_profil.username;
    if(this.fullName != ''){
      this.isAuth = true;
    }

   
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('data_rdm_event'));
    this.isAuth = user.auth_data.isLoggedIn;

    this.userProfilService.currentUser.subscribe((user:User)=>{
      this.user=user;
    })
    this.authService.isLoggedIn.subscribe((isLoggin)=>{
      this.isAuth=isLoggin
    })

  }

  logout()
  {
    this.authService.logOut()
    this.router.navigate(["/login"])
  }
}
