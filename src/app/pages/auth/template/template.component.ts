import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor() { 
    // if(localStorage.getItem('firstConnexion') == '1'){
    //   window.location.reload();
    //   localStorage.setItem('firstConnexion', '2');
    // }
  }

  ngOnInit(): void {
    document.querySelector("body")?.classList.add("landing-page")
  }
}
