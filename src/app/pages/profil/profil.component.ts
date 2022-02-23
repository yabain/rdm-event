import { Component, OnInit } from '@angular/core';
// import { NotificationService } from 'src/app/shared/services/notification/notification.sevices';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(
    // private notification : NotificationService
  ) {
    console.log('profil')
   }

  ngOnInit(): void {
    // this.showNotification();
  }

  showNotification(){
    // this.notification.showError();
  }


}
