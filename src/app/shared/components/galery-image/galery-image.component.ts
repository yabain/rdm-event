import { Component, Input, OnInit } from '@angular/core';
import { EntityID } from '../../entities';
import { FirebaseFile } from '../../utils/services/firebase';

@Component({
  selector: 'app-galery-image',
  templateUrl: './galery-image.component.html',
  styleUrls: ['./galery-image.component.scss']
})
export class GaleryImageComponent implements OnInit {

  images:String[]=[];
  hasLoaded:boolean=false;
  @Input() loadFromDatabase:boolean=true;
  @Input() userID:EntityID

  constructor(
    private firebaseFile:FirebaseFile
  ) { }

  ngOnInit(): void {
    if(this.loadFromDatabase)
    { 

    }
  }

}
