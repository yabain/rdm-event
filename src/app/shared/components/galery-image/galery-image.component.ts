import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galery-image',
  templateUrl: './galery-image.component.html',
  styleUrls: ['./galery-image.component.scss']
})
export class GaleryImageComponent implements OnInit {

  images:String[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
