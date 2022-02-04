import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ellections',
  templateUrl: './ellections.component.html',
  styleUrls: ['./ellections.component.scss']
})
export class EllectionsComponent implements OnInit {
  ellectName: string;
  ellectDescript: string;

  constructor() { 
    if(!this.ellectName){
      this.ellectName = "ÉLLECTIONS"
    }
    if(!this.ellectDescript){
      this.ellectDescript = "Bienvenue dans l'espace qui vous permet d'effectuer des éllections. Nous n'attendons plus que vous pour voter."
    }
  }

  ngOnInit(): void {
  }

}
