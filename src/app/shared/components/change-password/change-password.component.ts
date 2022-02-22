import { Component, OnInit } from '@angular/core';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

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
