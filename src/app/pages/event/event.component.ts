import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EntityID, Evenement, User } from 'src/app/shared/entities';
import { BusinessUser } from 'src/app/shared/entities/business-user';
import { EvenementBussinessService } from 'src/app/shared/services/evenement-bussiness/evenement-bussiness.service';

declare var $:any;


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [DatePipe]
})
export class EventComponent implements OnInit {

  maDate = new Date();
  day: any;
  year: any;
  month: any;

  selectedEvent:Evenement=new Evenement()
  selectedUserCreator:User=new User()
  hasLoadDetailEvent = false;

  constructor(private datePipe: DatePipe,private eventBusinessService:EvenementBussinessService){
      // this.maDate = this.datePipe.transform(this.maDate, 'dd/MM/yyyy');
      this.day = this.maDate.getMonth();
      this.year =  this.maDate.getFullYear();
      this.month = this.maDate.getDay();
  }

  ngOnInit(): void {
    
  }
  closeCreateEventForm()
  {
    (<HTMLElement>document.querySelector("#event-form-closed")).click()
  }
  
  showDetailModal()
  {
    $("#detail_event").modal("show")
  }

  hideDetailModal()
  {
    $("#detail_event").modal("hide")
  }

  selectEvent(eventID)
  {
    console.log("Selected Event ",eventID)
    this.hasLoadDetailEvent=false;
    this.showDetailModal()
    this.eventBusinessService
  }

}
