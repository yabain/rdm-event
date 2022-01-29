import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector("body")?.classList.add("page-has-left-panels page-has-right-panels")
  }

}
