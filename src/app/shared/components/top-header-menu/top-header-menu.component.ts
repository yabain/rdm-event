import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header-menu',
  templateUrl: './top-header-menu.component.html',
  styleUrls: ['./top-header-menu.component.scss']
})
export class TopHeaderMenuComponent implements OnInit {
  @Input()
  isLogin:boolean = false;
  isAdmin:boolean = true;

  constructor(
  ) { 
  }

  ngOnInit(): void {
  }
}
