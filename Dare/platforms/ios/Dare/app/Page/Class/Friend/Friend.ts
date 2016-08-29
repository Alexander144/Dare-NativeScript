import firebase = require("nativescript-plugin-firebase");
class Friend{
    Username: string;
    FriendsUsername: string;
    AreFriends: boolean;
    Button: any;
    Selected:boolean;
    Date: Date;

    constructor(Username:string, FriendsUsername:string, AreFriends: boolean){
       this.Username = Username;
       this.FriendsUsername = FriendsUsername;
       this.AreFriends = AreFriends;
       this.Selected = false;
       
    }
    
    SetDate(Date:Date){
        this.Date = Date;
    }
    Done(){
         firebase.setValue("Users/"+this.Username+"/Friends/Accept/"+ this.FriendsUsername, true);
         firebase.setValue("Users/"+this.FriendsUsername+"/Friends/Accept/"+ this.Username, true);
         firebase.remove("Users/"+this.Username+"/Friends/Request/"+this.FriendsUsername);
    }
    Delete(){
        firebase.remove("Users/"+this.Username+"/Friends/Accept/"+this.FriendsUsername);
        firebase.remove("Users/"+this.FriendsUsername+"/Friends/Accept/"+this.Username);
    }
    Select(){
        this.Selected =! this.Selected;
       if(this.Selected == true){
           //Gjør om til en annen farge
       }else{
           //Samme her
       }
    }
    Send(InputDare){
         firebase.push("Dares/"+this.FriendsUsername,{'From': this.Username, 'Dare':InputDare});
         this.Selected = false;
    }
} 

export default Friend;