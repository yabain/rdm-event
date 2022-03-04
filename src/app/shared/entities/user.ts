import { UserType } from "../enum";
import { Entity } from "./entity";


export class User extends Entity
{
    username:String="";
    fullname:String="";
    sexe:String="";
    email:String="";
    photoUrl:String="assets/img/img/user.jpeg";
    password:String="";
    phoneNumber:String="";
    dateCreated:String="";
    dateNaiss:String="";
    lieuxNaiss:String="";
    ville:String="";
    region:String="";
    nationalite:String="";
    quartier:String="";
    rememberMe:boolean=false;
    about:String=""
    availability:number=0;
    dateDeleted:String=""
    userType:UserType=UserType.NORMAL_USER
    websiteLink:String="";
    ecole_entreprise:String=""
    facebook_link:String=""
    tweeter_link:String=""
    instagram_link:String="";
    metier:String="";
    work_domaine:String=""

    getFullName()
    {
        return this.fullname
    }
    setFullName(fullname)
    {
        this.fullname=fullname
    }
    getPrintableName()
    {
        return this.username
    }
    

    getPrintableIdentity()
    {
        return this.getPrintableName().length>0?this.getPrintableName():(this.email.length>0?this.email:this.phoneNumber)
    }

    getCallerName()
    {
        return this.userType==UserType.NORMAL_USER? this.fullname : this.getPrintableName()
    }
    override toString(): Record<string | number, any> {
        return {
            ...super.toString(),
            "username":this.username,
            "fullname":this.fullname,
            "sexe":this.sexe,
            "email":this.email,
            "photoUrl":this.photoUrl,
            "password":this.password,
            "phoneNumber":this.phoneNumber,
            "dateCreated":this.dateCreated,
            "dateNaiss":this.dateNaiss,
            "lieuxNaiss":this.lieuxNaiss,
            "ville":this.ville,
            "nationalite":this.nationalite,
            "rememberMe":this.rememberMe,
            "about":this.about,
            "availability":this.availability,
            "dateDeleted":this.dateDeleted,
            "region":this.region,
            "quartier":this.quartier,
            "ecole_entreprise":this.ecole_entreprise,
            "websiteLink":this.websiteLink,
            "facebook_link":this.facebook_link,
            "tweeter_link":this.tweeter_link,
            "instagram_link":this.instagram_link,
            "userType":this.userType,
            "metier":this.metier,
            "work_domaine":this.work_domaine

        }

    }

}


