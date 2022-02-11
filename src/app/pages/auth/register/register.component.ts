import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/entities';
import { BusinessUser } from 'src/app/shared/entities/business-user';
import { UserType } from 'src/app/shared/enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserProfilService } from 'src/app/shared/services/user-profil/user-profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { MustMatch } from 'src/app/shared/utils/helpers/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted:boolean=false;
  waitResponse:boolean=false;
  errorMessage:String=""
  successMessage:String=""
  form:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private userProfilService:UserProfilService,
    private authService:AuthService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      userType:["normal_user",[Validators.required]],
      simple_user:this.formBuilder.group({
        fullname:["",[Validators.required]],
        username:["",[Validators.required]],
        email: ["",[Validators.required,Validators.email]],
        password:["",[Validators.required,Validators.minLength(6)]],
        sexe:["",[Validators.required]],
        confirmpassword:["",[Validators.required]],
      },{
        validators:MustMatch('password','confirmpassword')
      }),
      org_user:this.formBuilder.group({
        email: ["",[Validators.required,Validators.email]],
        password:["",[Validators.required,Validators.minLength(6)]],
        confirmpassword:["",[Validators.required]],
        workGroupName:["",[Validators.required]]
      },{
        validators:MustMatch('password','confirmpassword')
      })
    })
    this.form.controls['userType'].valueChanges.subscribe((value)=>{
      
    })
  }

  submit()
  {
    this.submitted=true;
    this.errorMessage=""    
    let user:User;
    if(this.form.controls["userType"].value==UserType.NORMAL_USER)
    {
      if(this.form.get("simple_user").invalid) return;
      user=new User();
      user.hydrate(this.form.value.simple_user)
    }
    else
    {
      if(this.form.get("org_user").invalid) return;
      user = new BusinessUser();
      user.hydrate(this.form.value.org_user)
    }
    this.waitResponse=true;
    this.userService.createNewAccount(user)
    .then((result)=>this.authService.authLogin(user))
    .then((result)=>{
      this.waitResponse=false;
      this.userProfilService.setUser(user);
      this.successMessage="Authentitification réussie. Redirection...";
      this.router.navigate(["/page/news"])
    })
    .catch((error)=>{
      this.waitResponse=false;
      console.log("Error Auth: ",error);
      this.errorMessage=error.message
    })
  }

}
