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


declare var $:any;

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
  selectedCategorie:CategorieEvenement;
  formCategorie:FormGroup;
  submitted:boolean=false;
  waitResponse:boolean=false;
  allImageCandidats:CustomFile[]=[]
  formCandidature:FormGroup;
  waitCandidatureResponse:boolean=false;
  submittedCandidature: boolean;

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

  initEvent()
  {
    this.evenementService.getEventByID(this.idEvent)
    .then((value)=>{
      this.event=value.result
      console.log("Event ",this.event)
      return this.userService.getUserById(this.event.eventOwner)
    })
    .then((value)=>{
      this.owner=value.result
    })
    .catch((error)=>{
      // console.log("Error ",error)
      this.notificationService.errorNotification(`Une erreur est survenue: ${error.message}`)
    })
  }
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((value)=>{
      this.isAuth=value;
    })
    this.initEvent();
    this.userProfilService.currentUser.subscribe((user)=>{
      this.currentUser=user;
    })

    this.formCategorie=new FormGroup({
      nom:new FormControl("",[Validators.required]),
      description:new FormControl("")
    })

    this.formCandidature = new FormGroup({
      fullName:new FormControl("",[Validators.required]),
      num:new FormControl(0,[Validators.required]),
      description:new FormControl("")
    })

    $("#add-candidat").on("hide.bs.modal",(e)=>{
      this.clearCandidatureForm();
    })
  }

  getAllVoteByCandidate(id:EntityID)
  {
    return ""
  }

  uploadCandidateImage(file:{file:CustomFile,newFile:boolean})
  {
    if(!file.newFile)
    {
      this.allImageCandidats.push(file.file)
      return;
    }
    this.notificationService.asyncNotification(new Promise((resolve,reject)=>{
      this.firebaseFile.uploadFile(this.event.eventOwner.toString().toString(),file.file)
      .subscribe({
        complete:()=>{
          resolve(file)
        },
        error:(error)=>reject(error)
      })
    }),
    (resp)=>{
      this.allImageCandidats.push(file.file)
      this.notificationService.successNofitication(`L'image ${file.file.name} a été uploadé avec success`)
    },
    (error)=>{
      console.log("upload Error: ",error)
      return `Erreur lors de l'uplodad de l'image ${file.file.name}:${error.message}`
    }
    ,
    `Upload de l'image ${file.file.name} en cours`
    )
    
  }
  shoConsole()
  {
    console.log("Selected ",this.selectedCandidate)
  }
  addNewCategorie()
  {
    this.submitted=true;
    if(!this.formCategorie.valid) return;
    let cat=new CategorieEvenement()
    cat.hydrate(this.formCategorie.value);
    cat.evendID.setId(this.idEvent.toString())
    this.waitResponse=true;
    this.evenementService.addCathegorie(this.idEvent,cat)
    .then((result)=>{
      this.waitResponse=false;
      this.submitted=false;
      this.formCategorie.reset();
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
  clearCandidatureForm()
  {
      this.allImageCandidats=[];
      this.formCandidature.reset();
  }
  addNewCandidature()
  {
    this.submittedCandidature=true;
    if(!this.formCandidature.valid) return;
    this.waitCandidatureResponse=true;
    let candidat:VoteCandidate=new VoteCandidate();
    candidat.hydrate(this.formCandidature.value);
    candidat.images=this.allImageCandidats.map((candidatImg)=>candidatImg.link);
    candidat.idCategori.setId(this.selectedCategorie.id.toString())
    this.evenementService.addCandidate(this.idEvent,candidat)
    .then((result)=>{
      this.submittedCandidature=false;
      this.waitCandidatureResponse=false;
      this.clearCandidatureForm()
      $("#add-candidat").modal("toggle")
      this.notificationService.successNofitication("Un nouveau candidature a été ajouté avec succées");
      this.initEvent();
    })
    .catch((error)=>{
      this.submittedCandidature=false;
      this.waitCandidatureResponse=false;
      this.notificationService.errorNotification("Une error est survenue l'ors de l'ajout d'un nouveau candidature: "+error.message);

    })
  }
  selectCategorie(categorie)
  {
    console.log("Categorie ",categorie)
    this.selectedCategorie=categorie
  }
  selectCandidat(candidat)
  {
    this.selectedCandidate=candidat;
  }
  hasMakeAction()
  {
    this.initEvent()
  }
}
