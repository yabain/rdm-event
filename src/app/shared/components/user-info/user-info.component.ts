import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  fullName: string = 'Mon nom';
  userName: string = 'mon prenom';
  dateNaiss: string;
  email: string = '';
  sexe: string;
  homme: boolean = true;
  femme: boolean = false;
  user: any;
  photoUrl: string;
  isAuth: boolean = false;


  constructor(
    // private notification : NotificationService
    private authService:AuthService,
    private userProfilService:UserProfilService
  ) {
   
    // this.user = JSON.parse(localStorage.getItem('data_rdm_event')).user_profil;

    // if(this.sexe == 'Homme'){
    //   this.homme = true;
    //   this.femme = false;
    //   console.log('sexe', this.homme)
    // }
    // else if(this.sexe == 'Femme'){
    //   this.homme = false;
    //   this.femme = true;
    // }
    // else{
    //   this.homme = true;
    //   this.femme = false;
    // }

}

  ngOnInit(): void {
    // this.showNotification();
    this.userProfilService.currentUser.subscribe((user)=>{
      this.user=user;
    })
    this.authService.isLoggedIn.subscribe((isAuth)=>{
      this.isAuth=isAuth;
    })
  }

  showNotification(){
    // this.notification.showError();
  }
}
