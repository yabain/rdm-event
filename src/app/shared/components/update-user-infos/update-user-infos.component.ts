import { Component, OnInit } from '@angular/core';
import { User } from '../../entities';
import { UserType } from '../../enum';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
import { ToastrNotificationService } from '../../utils/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-update-user-infos',
  templateUrl: './update-user-infos.component.html',
  styleUrls: ['./update-user-infos.component.scss']
})
export class UpdateUserInfosComponent implements OnInit {
  user: User;
  isAuth: boolean = false;
  isSubmittedForm:boolean=false;
  isBussinessAccount=false;
  
  constructor(
    private authService:AuthService,
    private userProfilService:UserProfilService,
    private notificationService:ToastrNotificationService
  ) { }

  ngOnInit(): void {
     // this.showNotification();
     this.userProfilService.currentUser.subscribe((user)=>{
      this.user=user;
      this.isBussinessAccount=this.user.userType==UserType.BUSINESS_USER
     });
     this.authService.isLoggedIn.subscribe((isLogged)=>{
       this.isAuth=isLogged;
     })
  }

  updateUserData(userData)
  {
    this.user.hydrate(userData);
    this.isSubmittedForm=true;
    this.userProfilService.saveUserProfil(this.user)
    .then((result)=>{
      this.isSubmittedForm=false;
      this.notificationService.successNofitication("Votre profil a été mis a jour avec succées")
    })
    .catch((error)=>{
      this.isSubmittedForm=false;
      this.notificationService.errorNotification(`Une erreur c'est produite l'ors de la mise a jour du profile: ${error.message}`)
    })

  }

}
