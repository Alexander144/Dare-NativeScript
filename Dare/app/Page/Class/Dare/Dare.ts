import firebase = require("nativescript-plugin-firebase");
class Dare{
    Username: string;
    Id: string;
    OutputDare: string;
    From: string;
    Date: Date;
    StatusOnDare: string;
    
    constructor(Id:string, OutputDare:string, From:string, Username:string){
       this.Id = Id;
       this.OutputDare = OutputDare;
       this.From = From;
       this.Username = Username;
       this.StatusOnDare = "Received";
    }
    SetDate(Date:Date){
        this.Date = Date;
    }
     DoneDare(){
        firebase.remove("/Dares/" + this.Username + "/" + this.Id);
    }
} 

export default Dare;