import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


  /* -----------------------------
             * FullCalendar Init
             * Script file: fullcalendar.min.js
             * https://fullcalendar.io/
        * ---------------------------*/

declare var FullCalendar:any;
declare var $:any;

@Component({
  selector: 'app-calendar-interact-widget',
  templateUrl: './calendar-interact-widget.component.html',
  styleUrls: ['./calendar-interact-widget.component.scss']
})
export class CalendarInteractWidgetComponent implements OnInit {

    maDate = new Date();

    day: any;
    year: any;
    month: any;
    dateString : string;
  
    constructor(private datePipe: DatePipe){
        this.dateString = this.datePipe.transform(this.maDate, 'yyyy-MM-dd');
        console.log(this.dateString);

        this.day = this.maDate.getMonth();
        this.year =  this.maDate.getFullYear();
        this.month = this.maDate.getDay();
        // console.log('jour: ' , this.day, ' mois: ', this.month, ' année: ', this.year);
    }

  ngOnInit(): void {
      var calendarEl = document.getElementById('calendar');

      var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: ['interaction', 'dayGrid', 'timeGrid'],
          defaultView: 'dayGridMonth',
          defaultDate: this.dateString,
          header: {
              left: 'prev',
              center: 'title',
              right: 'next,dayGridMonth,timeGridWeek,timeGridDay'
          },
          buttonText: {
              month: ' ',
              week: ' ',
              day: ' '
          },
          buttonIcons: {
              prev: 'far fa-chevron-left',
              next: 'far fa-chevron-right'
          },

          eventClick: function (info:any) {
              var url = info.event.url;
              var is_modal = url.match(/^modal\:(#[-\w]+)$/);
              if (!is_modal) {
                  return;
              }

              info.jsEvent.preventDefault();
              var modal = is_modal[1];

              $(modal).modal('show');
          },
          events: [
            {
                title: 'Ellection Mis & Mister UdM',
                start: '2022-02-05',
                url: 'modal:#private-event'
            },
              {
                  title: 'Bal de l UdM',
                  start: '2022-02-05',
                  url: 'modal:#public-event'
              },
              {
                  title: 'UdM One heart',
                  start: '2022-02-12',
                  end: '2022-02-13',
                  url: 'modal:#private-event'
              }
          ]
      });

      calendar.render();
  }

}
