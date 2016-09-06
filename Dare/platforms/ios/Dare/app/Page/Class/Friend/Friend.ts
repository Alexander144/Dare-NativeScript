import firebase = require("nativescript-plugin-firebase");
import{ Observable } from "data/observable";
class Friend extends Observable{
    Username: string;
    FriendsUsername: string;
    AreFriends: boolean;
    Button: any;
    Selected:boolean;
    Date: Date;
    Color: string;

    constructor(Username:string, FriendsUsername:string, AreFriends: boolean){
        super();
       this.Username = Username;
       this.FriendsUsername = FriendsUsername;
       this.AreFriends = AreFriends;
       this.Selected = false;
       
       this.Color = "red";
    }
    
    SetDate(Date:Date){
        this.Date = Date;
    }
    Done(){
        var OUsername = {};
        OUsername[this.Username] = true;
        var FUsername = {};
        FUsername[this.FriendsUsername] = true;
         firebase.setValue("Users/"+this.Username+"/Friends/Accept/", FUsername);
         firebase.setValue("Users/"+this.FriendsUsername+"/Friends/Accept/",  OUsername);
         firebase.remove("Users/"+this.Username+"/Friends/Request/"+this.FriendsUsername);
    }
    Delete(){
        firebase.remove("Users/"+this.Username+"/Friends/Accept/"+this.FriendsUsername);
        firebase.remove("Users/"+this.FriendsUsername+"/Friends/Accept/"+this.Username);
    }
    Select(){
        this.Selected =! this.Selected;
       if(this.Selected == true){
           this.set("Color", "green");
           //Gjør om til en annen farge
       }else{
           //Samme her
           this.set("Color", "red");
       }
    }
    SendRequest(){
        var OUsername = {};
        OUsername[this.Username] = false;
         firebase.setValue("Users/"+this.FriendsUsername+"/Friends/Request/",OUsername);
         alert("Send friend request to " + this.FriendsUsername);
    }
    Send(InputDare){
         firebase.push("Dares/"+this.FriendsUsername,{'From': this.Username, 'Dare':InputDare});
         this.Selected = false;
         this.set("Color", "red");
    }
} 

export default Friend;