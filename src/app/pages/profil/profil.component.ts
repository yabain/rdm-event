import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/entities';
import { ActionStatus } from 'src/app/shared/others/actionstatus';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ToastrNotificationService } from 'src/app/shared/utils/services/toastr-notification/toastr-notification.service';
import { UploadFileService } from 'src/app/shared/utils/services/upload-file/upload-file.service';
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
    private authService:AuthService,
    private uploadFileService:UploadFileService,
    private usersService:UserService,
    private notificationService:ToastrNotificationService
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
  showModalPhoto()
  {

  }

  uploadFile(file)
  {
    let promise=null;
    if(file.newFile) promise=this.uploadFileService.uploadFile(file.file,this.userProfilService.currentUser.getValue().id.toString())
    else promise=Promise.resolve(new ActionStatus())
    
    promise.then((value)=>{
      this.user.photoUrl=file.file.link;
      return this.usersService.updateUser(this.user)
    })
    .then((value)=>{
      this.notificationService.successNofitication("Votre photo de profil a été mis a jour avec succes")
    })
    .catch((error)=>{
      this.notificationService.errorNotification("Une Erreur c'est produite l'ors de la mise de votre photo")
      this.notificationService.errorNotification(error.message)
    })
  }

}
