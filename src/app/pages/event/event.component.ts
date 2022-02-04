import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [DatePipe]
})
export class EventComponent implements OnInit {
  nombreEvent : number = 0 ; // Nombre total d'évènements

  maDate = new Date();
  day: any;
  year: any;
  month: any;

  constructor(private datePipe: DatePipe){
      // this.maDate = this.datePipe.transform(this.maDate, 'dd/MM/yyyy');
      this.day = this.maDate.getMonth();
      this.year =  this.maDate.getFullYear();
      this.month = this.maDate.getDay();
      this.nombreEvent = 5;
  }

  ngOnInit(): void {
    
  }
  closeCreateEventForm()
  {
    (<HTMLElement>document.querySelector("#event-form-closed")).click()
  }

}
