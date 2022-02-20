import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evenement, User } from '../../entities';

declare var $:any;

@Component({
  selector: 'app-show-modal-details-event',
  templateUrl: './show-modal-details-event.component.html',
  styleUrls: ['./show-modal-details-event.component.scss']
})
export class ShowModalDetailsEventComponent implements OnInit {
  @Input() event:Evenement;
  @Input() owner:User;
  @Input() hasLoadDetailEvent:boolean;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  navigateToEllection(){
    $("#detail_event").modal("toggle")
    this.router.navigate(['/page/ellection/',this.event.id.toString()]);
    // this.router.navigateByUrl('/page/ellection');
  }

}
