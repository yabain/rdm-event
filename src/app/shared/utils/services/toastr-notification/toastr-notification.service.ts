import { Injectable } from '@angular/core';
import AWN from "awesome-notifications"

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {
  globalOption={
    position:"top-right",
    durations:{
      global:3000
    }
  }
  notifier = new AWN(this.globalOption)
  constructor() {

  }

  successNofitication(message)
  {
    this.notifier.success(message)
  }
  asyncNotification(promise,...rest)
  {
    this.notifier.async(promise,...rest)
  }

  errorNotification(message)
  {
    this.notifier.alert(message)
  }
  warningNotification(message)
  {
    this.notifier.warning(message)
  }

}
