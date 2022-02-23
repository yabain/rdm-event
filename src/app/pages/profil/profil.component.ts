import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/entities';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user:User=null;
  isAuth:boolean=null;

  constructor(
    // private notification : NotificationService
    private userProfilService:UserProfilService,
    private authService:AuthService
  ) {

   }

  ngOnInit(): void {
    // this.showNotification();
    this.authService.isLoggedIn.subscribe((auth)=>{
      this.isAuth=auth;
    })

    this.userProfilService.currentUser.subscribe((user)=>{
      this.user=user;
    })
  }

  showNotification(){
    // this.notification.showError();
  }


}
