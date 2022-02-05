import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UrlService } from 'src/app/shared/services/url/url.service';

@Component({
  selector: 'app-ellections',
  templateUrl: './ellections.component.html',
  styleUrls: ['./ellections.component.scss']
})
export class EllectionsComponent implements OnInit {
  isOwner : boolean = false;
  isAuth : boolean = false;
  ellectStatus : boolean = true; // status de l'éllection, true si ouvert, false si cloturé.
  ellectName: string;
  ellectDescript: string;
  idToUrl : string;

  constructor(
    private authService: AuthService,
    private urlService: UrlService
  ) { 
    this.isAuth = authService.isAuth;
    this.isAdminer(authService.isAdmin);
    this.getUrl();

    if(!this.ellectName){
      this.ellectName = "ÉLLECTIONS"
    }
    if(!this.ellectDescript){
      this.ellectDescript = "Bienvenue dans l'espace qui vous permet d'effectuer des éllections. Nous n'attendons plus que vous pour voter."
    }
  }

  ngOnInit(): void {
  }

  isAdminer(isAdmin){
    if(isAdmin){
      this.isOwner = true
    }
  }

  getUrl(){
    this.idToUrl = this.urlService.getEllectIdToUrl();
  }

}
