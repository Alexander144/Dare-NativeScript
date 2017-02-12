import firebase = require("nativescript-plugin-firebase");
import { Image } from "ui/image";
import{ Observable } from "data/observable";

class Dare extends Observable{
    Username: string;
    Id: string;
    OutputDare: string;
    From: string;
    Date: Date;
    StatusOnDare: string;
    Points: string;
    DareIsFromOrTo: string;
    ImageToAcceptDare: Image;
    DareSettingToogle: boolean;
    
    constructor(Id:string, OutputDare:string, From:string, Username:string){
      super();
       this.Id = Id;
       this.OutputDare = OutputDare;
       this.From = From;
       this.Username = Username;
       this.StatusOnDare = "Received";
       this.Points = "0P";
       this.DareIsFromOrTo = "From";
       this.ImageToAcceptDare = null;
       this.DareSettingToogle = false;
    }
    SetDate(Date:Date){
        this.Date = Date;
    }
    ShowDareSetting()
    {
      this.DareSettingToogle = !this.DareSettingToogle;
      this.set("DareSettingToogle", this.DareSettingToogle);
       console.log(this.DareSettingToogle);
    }
     DoneDare(){
        firebase.remove("/Dares/" + this.Username + "/" + this.Id);
    }
} 

export default Dare;