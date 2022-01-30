import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit(): void {
      var calendarEl = document.getElementById('calendar');

      var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: ['interaction', 'dayGrid', 'timeGrid'],
          defaultView: 'dayGridMonth',
          defaultDate: '2019-05-07',
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
                  title: 'Chris Greyson’s Bday',
                  start: '2019-05-08',
                  url: 'modal:#public-event'
              },
              {
                  title: 'Make Dinner Plans...',
                  start: '2019-05-08',
                  url: 'modal:#private-event'
              },
              {
                  title: 'Jenny’s Birthday...',
                  start: '2019-05-30',
                  url: 'modal:#private-event'
              },
              {
                  title: 'Videocall to talk...',
                  start: '2019-05-30',
                  url: 'modal:#public-event'
              },
              {
                  title: 'Breakfast at the...',
                  start: '2019-05-26',
                  url: 'modal:#public-event'
              },
              {
                  title: 'Send the new...',
                  start: '2019-05-26',
                  url: 'modal:#private-event'
              },
              {
                  title: 'Take Querty to the...',
                  start: '2019-05-26',
                  url: 'modal:#public-event'
              }
          ]
      });

      calendar.render();
  }

}
