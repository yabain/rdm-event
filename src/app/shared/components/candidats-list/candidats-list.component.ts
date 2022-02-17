import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFile, EntityID, Evenement, User } from '../../entities';
import { CategorieEvenement, VoteEvenement } from '../../entities/vote-evenement';
import { VoteCandidate } from '../../entities/votecandidate';
import { AuthService } from '../../services/auth/auth.service';
import { EvenementBussinessService } from '../../services/evenement-bussiness/evenement-bussiness.service';
import { VoteEvenementBussinessService } from '../../services/evenement-bussiness/vote-evenement-bussiness.service';
import { UserProfilService } from '../../services/user-profil/user-profil.service';
import { UserService } from '../../services/user/user.service';
import { FirebaseFile } from '../../utils/services/firebase';
import { ToastrNotificationService } from '../../utils/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-candidats-list',
  templateUrl: './candidats-list.component.html',
  styleUrls: ['./candidats-list.component.scss']
})
export class CandidatsListComponent implements OnInit {
  isAuth: boolean = false;
  isOwner: boolean = false;
  isAdmin: boolean = false;
  voteStatus: boolean; //true = vote ouvert
  @Input() idEvent:EntityID=new EntityID()
  event:VoteEvenement=new VoteEvenement();
  currentUser:User=new User();
  owner:User;
  candidates:VoteCandidate[]=[]
  selectedCandidate:VoteCandidate=new VoteCandidate()
  formCategorie:FormGroup;
  submitted:boolean=false;
  waitResponse:boolean=false;
  allImageCandidats:CustomFile[]=[]

  constructor(
    private evenementService:VoteEvenementBussinessService,
    private userService:UserService,
    private userProfilService: UserProfilService,
    private notificationService:ToastrNotificationService,
    private authService: AuthService,
    private firebaseFile:FirebaseFile
  ) { 
    this.voteStatus = true;
    // this.isOwner = true;
    this.isAdmin = this.authService.isAdmin;
    if(this.isAuth){
      if(this.isAdmin){
        this.isOwner = true;
        console.log ('is owner', this.isOwner)
      }
    }
  }

  ngOnInit(): void {

    this.authService.isLoggedIn.subscribe((value)=>{
      this.isAuth=value;
    })
    this.evenementService.getEventByID(this.idEvent)
    .then((value)=>{
      this.event=value.result
      return this.userService.getUserById(this.event.eventOwner)
    })
    .then((value)=>{
      this.owner=value.result
    })
    .catch((error)=>{
      // console.log("Error ",error)
      this.notificationService.errorNotification(`Une erreur est survenue: ${error.message}`)
    })

    this.userProfilService.currentUser.subscribe((user)=>{
      this.currentUser=user;
    })

    this.formCategorie=new FormGroup({
      nomCategorie:new FormControl("",[Validators.required]),
      description:new FormControl("")
    })
  }

  getAllVoteByCandidate(id:EntityID)
  {
    return ""
  }

  uploadCandidateImage(file)
  {
    this.notificationService.asyncNotification(new Promise((resolve,reject)=>{
      this.firebaseFile.uploadFile(this.event.eventOwner.toString().toString(),file)
      .subscribe({
        complete:()=>{
          resolve(file)
        },
        error:(error)=>reject(error)
      })
    }),
    (resp)=>{
      this.allImageCandidats.push(file)
      this.notificationService.successNofitication(`L'image ${file.name} a été uploadé avec success`)
    },
    (error)=>{
      console.log("upload Error: ",error)
      return `Erreur lors de l'uplodad de l'image ${file.name}:${error.message}`
    }
    ,
    `Upload de l'image ${file.name} en cours`
    )
    
  }

  addNewCategorie()
  {
    console.log("new Cat")
    this.submitted=true;
    if(!this.formCategorie.valid) return;
    let cat=new CategorieEvenement()
    cat.hydrate(this.formCategorie.value);
    this.waitResponse=true;
    console.log("idEvent ",this.idEvent)
    this.evenementService.addCathegorie(this.idEvent,cat)
    .then((result)=>{
      this.waitResponse=false;
      this.submitted=false;
      (<HTMLAnchorElement>document.querySelector("#categorieModalCloseButton")).click()
      this.notificationService.successNofitication("La nouvelle catégorie a été ajouté avec success")
    })
    .catch((error)=>{
      this.waitResponse=false;
      this.submitted=true;
      this.notificationService.errorNotification("Une erreur c'est produite: "+error.message)
      console.log("Error add catégorie ",error)
    })
  }

}
