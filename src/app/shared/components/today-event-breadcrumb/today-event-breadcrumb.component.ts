import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EntityID, Evenement } from '../../entities';
import { EvenementBussinessService } from '../../services/evenement-bussiness/evenement-bussiness.service';
import { UtilTime } from '../../utils/functions';

@Component({
  selector: 'app-today-event-breadcrumb',
  templateUrl: './today-event-breadcrumb.component.html',
  styleUrls: ['./today-event-breadcrumb.component.scss']
})
export class TodayEventBreadcrumbComponent implements OnInit {
  day:number=new Date().getDate();
  year:number=new Date().getFullYear()
  month:string=UtilTime.getMonthStringByNumber(new Date().getMonth())
  monthNum=new Date().getMonth()+1;
  hasLoadData:boolean=false
  @Output() selectEvent:EventEmitter<String>=new EventEmitter();
  // {
  //   id:"#klqmjdlfj",
  //   controlsid:"klqmjdlfj",
  //   datetime:"2022-02-05T00:00",
  //   datetimeString:"05 Février",
  //   title:"Election Miss & Master UDM",
  //   type:"event_vote",
  //   place:"Bangangté",
  //   description:"Election des miss & master a l'université des montagnes"
  // },
  eventList=[  
  ]
  constructor(private evenementService:EvenementBussinessService) { }

  ngOnInit(): void {
    this.evenementService.listSubject.subscribe((events:Map<string,Evenement>)=>{
      this.hasLoadData=true;
      this.eventList=[];
      this.eventList=Array.from(events.values())
      .filter((event)=>{
        let d1 = new Date()
        d1.setFullYear(parseInt(event.startDate.toString().split("/")[2]))
        d1.setMonth(parseInt(event.startDate.toString().split("/")[1])-1)
        d1.setDate(parseInt(event.startDate.toString().split("/")[0]))

        let d2 = new Date()
        d2.setFullYear(parseInt(event.endDate.toString().split("/")[2]))
        d2.setMonth(parseInt(event.endDate.toString().split("/")[1])-1)
        d2.setDate(parseInt(event.endDate.toString().split("/")[0]))

        let now=new Date()
        return now>=d1 && now<=d2
      })
      .map((event)=>{
        let d=new Date();
        d.setFullYear(parseInt(event.startDate.toString().split("/")[2]))
        d.setMonth(parseInt(event.startDate.toString().split("/")[1])-1)
        d.setDate(parseInt(event.startDate.toString().split("/")[0]))

        d.setHours(parseInt(event.startTime.split(":")[0]))
        d.setMinutes(parseInt(event.startTime.split(":")[1]))

        let d2 = new Date()
        d2.setFullYear(parseInt(event.endDate.toString().split("/")[2]))
        d2.setMonth(parseInt(event.endDate.toString().split("/")[1])-1)
        d2.setDate(parseInt(event.endDate.toString().split("/")[0]))

        let sd= UtilTime.getFormatDayAndMonth(d)
        let stringTitle= sd.split(" ")[0];
        if(d.getMonth()!=d2.getMonth())
        {
          stringTitle=`${sd} - ${UtilTime.getFormatDayAndMonth(d2)}`;
        }
        else if(d.getDate()!=d2.getDate())
        {
          let sd2=UtilTime.getFormatDayAndMonth(d2)
          stringTitle+=` - ${sd2.split(" ")[0]} ${sd2.split(" ")[1]}`
        }
        else {
          stringTitle=sd;
        }

        return {
          id:`#${event.id.toString().toString().replace(/[0-9]*/g,"")}`,
          controlsid:event.id.toString().toString().replace(/[0-9]*/g,""),
          datetime:d.toISOString(),
          idEvent:event.id.toString(),
          datetimeString:stringTitle,
          title:event.name,
          type:event.eventType,
          place:event.place,
          description:event.description
        }
      })
    })
  }

  sendSelectedEvent(id)
  {
    this.selectEvent.emit(id)
  }

}
