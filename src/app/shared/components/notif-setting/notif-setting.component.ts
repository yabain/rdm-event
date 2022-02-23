import { Component, OnInit } from '@angular/core';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-notif-setting',
  templateUrl: './notif-setting.component.html',
  styleUrls: ['./notif-setting.component.scss']
})
export class NotifSettingComponent implements OnInit {

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
