import { Component, OnInit } from '@angular/core';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

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
