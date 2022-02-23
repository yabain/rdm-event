import { Component, OnInit } from '@angular/core';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  constructor(
    // private notification : NotificationService
  ) { 
  }

  ngOnInit(): void {
    document.querySelector("body")?.classList.add("page-has-left-panels page-has-right-panels");
    // this.showNotification();
  }

  showNotification(){
    // this.notification.showError();
  }
  

}
