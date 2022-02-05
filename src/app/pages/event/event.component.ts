import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EntityID, Evenement, User } from 'src/app/shared/entities';
import { BusinessUser } from 'src/app/shared/entities/business-user';
import { EvenementBussinessService } from 'src/app/shared/services/evenement-bussiness/evenement-bussiness.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UtilTime } from 'src/app/shared/utils/functions';
import { monthStringList } from 'src/app/shared/utils/functions/time';
import { Router } from '@angular/router';

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

  eventList : {event:Evenement,user:User}[]=[]
  userList:Map<string,User>=new Map()
  hasLoadEventList:Boolean=false;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private eventBusinessService:EvenementBussinessService,
    private userService:UserService){
      // this.maDate = this.datePipe.transform(this.maDate, 'dd/MM/yyyy');
      this.day = this.maDate.getMonth();
      this.year =  this.maDate.getFullYear();
      this.month = this.maDate.getDay();
  }

  ngOnInit(): void {
    this.eventBusinessService.listSubject.subscribe((event)=>{
      this.eventList = [];
      this.hasLoadEventList=true;
      this.eventList=Array.from(event.values()).map((value:Evenement)=>{
        return {
          event:value,
          user:null
        }
      })
      // Array.from(event.values()).forEach((value:Evenement)=>{
      //   this.userService.getUserById(value.eventOwner)
      //   .then((result)=>{
      //     console.log("result ",result)
      //     this.eventList.push({
      //       event:value,
      //       user:result.result
      //     })
      //   })
      // })
    })
  }
  getStringDate(stringDate,stringTime)
  {
    let d = UtilTime.getDateFromString(stringDate,stringTime)
    return `${UtilTime.getDateNumberFromDate(d)} ${monthStringList[d.getMonth()]} A ${stringTime}`
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
    let id=new EntityID()
    id.setId(eventID)
    this.hasLoadDetailEvent=false;
    this.showDetailModal()
    this.eventBusinessService.getEventByID(id)
    .then((result)=>{
      this.selectedEvent=result.result;
      this.hasLoadDetailEvent=true;

      // return this.userService.getUserById(this.selectedEvent.eventOwner)
    })
    // .then((result)=>{
    //   this.selectedUserCreator=result.result
    //   this.hasLoadDetailEvent=true;
    // })
    .catch((error)=>{
      console.log("Error: ",error)
    })
  }
  navigateToEllection(EllectId?){
    let url = 'page/ellection/' + EllectId;
    this.router.navigate([url]);
    // this.router.navigateByUrl('/page/ellection');
  }
  navigateToConf(ConfId?: string){
    let url = '/page/conf/' + ConfId;
    this.router.navigateByUrl(url);
    // this.router.navigateByUrl('/page/ellection');
  }

}
