import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomFile, EntityID, User } from '../../entities';
import { FirebaseFile } from '../../utils/services/firebase';

declare var $:any;


@Component({
  selector: 'app-uploader-choise-image-file',
  templateUrl: './uploader-choise-image-file.component.html',
  styleUrls: ['./uploader-choise-image-file.component.scss']
})
export class UploaderChoiseImageFileComponent implements OnInit {
  
  @Input() idComponent:string="update-header-photo"
  @Input() user:User;
  @Output() fileEventUploaded:EventEmitter<{file:CustomFile,newFile:boolean}>=new EventEmitter<{file:CustomFile,newFile:boolean}>()
  selectedImage:CustomFile;
  hasSelectedImage:boolean=false

  constructor(
    private firebaseFile:FirebaseFile
  ) { }

  ngOnInit(): void {
    
    
  }
  selectFile()
  {
    (<HTMLInputElement>document.querySelector("#selecteFile")).click()
  }

  uploadSelectedFile(event: any)
  {
    let selectedImage: CustomFile = new CustomFile(),imgSrc="";
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      let file=event.target.files[0];
      selectedImage.name = file.name;
      selectedImage.lastModified = file.lastModified;
      selectedImage.size = file.size;
      selectedImage.type = file.type;
      selectedImage.data = file;
      this.fileEventUploaded.emit({file:selectedImage,newFile:true});
      $("#"+this.idComponent).modal('toggle')
    }
  }
  choiseSelectedData()
  {
    this.fileEventUploaded.emit({file:this.selectedImage,newFile:false});
    this.closeModal()
  }
  closeModal()
  {
    $("#select-candidate-photo").modal('toggle')
    $("#"+this.idComponent).modal('toggle')    
    // (<HTMLAnchorElement>document.querySelector('#select-candidate-photo')).click()
  }

  OnSelectedImageEVent(imgSrc)
  {
    this.hasSelectedImage=true;
    this.selectedImage=imgSrc    
  }

}
