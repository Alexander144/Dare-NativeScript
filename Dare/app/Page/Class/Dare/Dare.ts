import firebase = require("nativescript-plugin-firebase");
import Page = require("ui/frame");
import { Image } from "ui/image";
import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import {EventData} from "data/observable";
import enums = require("ui/enums");

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
    DareSettingHide: string;


    
    constructor(Id:string, StatusOnDare: string, OutputDare:string, From:string, Username:string){
      super();
       this.Id = Id;
       this.OutputDare = OutputDare;
       this.From = From;
       this.Username = Username;
       this.StatusOnDare = StatusOnDare;
       this.Points = "0P";
       this.DareIsFromOrTo = "From";
       this.ImageToAcceptDare = null;
       this.DareSettingToogle = false;
       this.DareSettingHide = "collapse";
       this.set("DareSettingToogle", this.DareSettingToogle);
    }
    SetDate(Date:Date){
        this.Date = Date;
    }
    ShowDareSetting()
    {
      this.DareSettingToogle = !this.DareSettingToogle;
      if(this.DareSettingToogle)
      {
          this.set("DareSettingHide", "visible");
      }
      else
      {
          this.set("DareSettingHide", "collapse");
      }
      this.set("DareSettingToogle", this.DareSettingToogle);
       console.log(this.DareSettingToogle);
    }

    AcceptDare(){
            Page.topmost().navigate({
              
              moduleName: "Page/CameraPage/Camera",
               context:{ DareToAccept: this
                  },
              transition: {
                  name: "slideBottom",
                  duration: 380,
                  curve: "easeIn"
               },
              animated: true
              });
    }
    DeclineDare(){

    }
} 

export default Dare;