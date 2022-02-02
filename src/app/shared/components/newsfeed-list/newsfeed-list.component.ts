import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed-list',
  templateUrl: './newsfeed-list.component.html',
  styleUrls: ['./newsfeed-list.component.scss']
})
export class NewsfeedListComponent implements OnInit {
  isAuth: boolean;
  isAdmin: boolean;

  constructor() { 
    this.isAuth = true;
    this.isAdmin = true;}

  ngOnInit(): void {
  }

}
