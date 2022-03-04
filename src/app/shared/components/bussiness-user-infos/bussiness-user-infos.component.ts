import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';

@Component({
  selector: 'app-bussiness-user-infos',
  templateUrl: './bussiness-user-infos.component.html',
  styleUrls: ['./bussiness-user-infos.component.scss']
})
export class BussinessUserInfosComponent implements OnInit {
  user: any;
  isAuth: boolean = false;
  @Output() userUpdateDataEvent:EventEmitter<any>=new EventEmitter<any>()
  @Input() isSubmittedForm:boolean;
  
  formGroup:FormGroup=new FormGroup({});
  constructor(
    // private notification : NotificationService
    private authService:AuthService,
    private userProfilService:UserProfilService
  ) {
  
}
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    // this.showNotification();
    this.userProfilService.currentUser.subscribe((user)=>{
      this.user=user;
      this.formGroup=new FormGroup(
        {
          workGroupName:new FormControl(this.user.workGroupName,[Validators.required]),
          email:new FormControl(this.user.email,[Validators.email,Validators.required]),
          websiteLink: new FormControl(this.user.websiteLink),
          phoneNumber: new FormControl(this.user.phoneNumber),
          region: new FormControl(this.user.region),
          ville:new FormControl(this.user.ville),
          quartier:new FormControl(this.user.quartier),
          about:new FormControl(this.user.about),
          tweeter_link:new FormControl(this.user.tweeter_link),
          facebook_link:new FormControl(this.user.facebook_link),
          instagram_link:new FormControl(this.user.instagram_link),
          work_domaine:new FormControl(this.user.work_domaine)

        }
      )
    })
    this.authService.isLoggedIn.subscribe((isAuth)=>{
      this.isAuth=isAuth;
    })
    
  }

  showNotification(){
    // this.notification.showError();

  }
  submitForm()
  {
    this.userUpdateDataEvent.emit(this.formGroup.value)
  }

}
