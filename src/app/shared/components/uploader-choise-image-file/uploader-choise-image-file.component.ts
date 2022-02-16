import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader-choise-image-file',
  templateUrl: './uploader-choise-image-file.component.html',
  styleUrls: ['./uploader-choise-image-file.component.scss']
})
export class UploaderChoiseImageFileComponent implements OnInit {
  
  @Input() idComponent:string="update-header-photo"
  constructor() { }

  ngOnInit(): void {
  }

}
