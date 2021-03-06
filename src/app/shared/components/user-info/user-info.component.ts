import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

declare var $:any;
declare var moment:any;


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, AfterViewInit {

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
          fullname:new FormControl(this.user.getFullName(),[Validators.required]),
          email:new FormControl(this.user.email,[Validators.email,Validators.required]),
          dateNaiss:new FormControl(this.user.dateNaiss,[Validators.required]),
          username:new FormControl(this.user.getPrintableName(),[Validators.required]),
          websiteLink: new FormControl(this.user.websiteLink),
          phoneNumber: new FormControl(this.user.phoneNumber),
          region: new FormControl(this.user.region),
          ville:new FormControl(this.user.ville),
          quartier:new FormControl(this.user.quartier),
          sexe:new FormControl(this.user.sexe),
          about:new FormControl(this.user.about),
          ecole_entreprise:new FormControl(this.user.ecole_entreprise),
          tweeter_link:new FormControl(this.user.tweeter_link),
          facebook_link:new FormControl(this.user.facebook_link),
          instagram_link:new FormControl(this.user.instagram_link),
          metier:new FormControl(this.user.metier),
          work_domaine:new FormControl(this.user.work_domaine)

        }
      )
    })
    this.authService.isLoggedIn.subscribe((isAuth)=>{
      this.isAuth=isAuth;
    })
    
  }

  submitForm()
  {
    this.userUpdateDataEvent.emit(this.formGroup.value)

  }
}
