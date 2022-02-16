import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomFile } from '../../entities';
import { FirebaseFile } from '../../utils/services/firebase';

@Component({
  selector: 'app-uploader-choise-image-file',
  templateUrl: './uploader-choise-image-file.component.html',
  styleUrls: ['./uploader-choise-image-file.component.scss']
})
export class UploaderChoiseImageFileComponent implements OnInit {
  
  @Input() idComponent:string="update-header-photo"
  @Output() fileEventUploaded:EventEmitter<CustomFile>=new EventEmitter<CustomFile>()
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
      this.fileEventUploaded.emit(selectedImage);
      (<HTMLAnchorElement>document.querySelector('#closeModal')).click()
    }
  }

}
