import { Component, OnInit } from '@angular/core';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit {

  constructor(
    // private notification : NotificationService
  ) { }

  ngOnInit(): void {
    // this.showNotification();
  }

  showNotification(){
    // this.notification.showError();
  }


}
