import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/entities';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  submitted:boolean=false;
  waitResponse:boolean=false;
  errorMessage="";
  successMessage=""
  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(6)])
    })
  }

  submit()
  {
    this.submitted=true;
    if(this.form.invalid) return;
    this.waitResponse=true;
    let user:User=new User()
    user.hydrate(this.form.value)
    this.loginService.loginUser(user)
    .then((result)=>{
      this.waitResponse=false;
      this.successMessage="Authentification réussi. Redirection..."
      this.router.navigate(["/page/news"])
    })
    .catch((error)=>{
      console.log("Auth Error ",error)
      this.waitResponse=false;
      this.errorMessage=error.message;

    })
  }

}
