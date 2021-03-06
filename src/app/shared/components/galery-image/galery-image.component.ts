import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomFile, EntityID, User } from '../../entities';
import { FirebaseFile } from '../../utils/services/firebase';
import { ToastrNotificationService } from '../../utils/services/toastr-notification/toastr-notification.service';

declare var $:any;

@Component({
  selector: 'app-galery-image',
  templateUrl: './galery-image.component.html',
  styleUrls: ['./galery-image.component.scss']
})
export class GaleryImageComponent implements OnInit,OnChanges {

  images:CustomFile[]=[];
  hasLoaded:boolean=false;
  @Input() loadFromDatabase:boolean=true;
  @Input() user:User
  @Input() arrayImage:CustomFile[]=[]
  @Output() selectedImageEvent:EventEmitter<CustomFile>=new EventEmitter<CustomFile>()

  constructor(
    private firebaseFile:FirebaseFile,
    private notificationService:ToastrNotificationService
  ) { }

  updateUI()
  {
      if(this.loadFromDatabase==true)
      { 
        if(!this.user) return;
        this.hasLoaded=false;
        console.log("loadFromDatabase ",this.loadFromDatabase)
        this.firebaseFile.listAll(this.user.id.toString().toString())
        .then((result)=>{
          this.hasLoaded=true;
          this.arrayImage=result.result;
          setTimeout(()=>{
            $.material.init();
            document.querySelectorAll('.choose-photo-item input')
            .forEach((element)=>element.addEventListener("change",(e)=>{
              let srcImg=(<HTMLImageElement>(<HTMLElement>e.target).previousElementSibling).src;
              this.selectedImageEvent.emit(this.arrayImage.find((custom)=>custom.link==srcImg));
            }))
          })
        })
        .catch((error)=>{
          this.notificationService.errorNotification("Erreur l'ors du chargement des images. Veuillez recharger la page");
          console.log("Error download file ",error)
        })
      }
      else
      {
        this.hasLoaded=true;
        console.log("faulstezssss")
      }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user'])
    {
      this.updateUI()
    }
  }
  ngOnInit(): void {
    this.updateUI()
  }
}
