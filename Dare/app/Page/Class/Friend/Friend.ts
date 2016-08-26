import firebase = require("nativescript-plugin-firebase");
class Friend{
    Username: string;
    FriendsUsername: string;
    AreFriends: boolean;
    
    
    Date: Date;
    
    constructor(Username:string, FriendsUsername:string, AreFriends: boolean){
       this.Username = Username;
       this.FriendsUsername = FriendsUsername;
       this.AreFriends = AreFriends;
    }
    
    SetDate(Date:Date){
        this.Date = Date;
    }
    Done(){
    
    }
} 

export default Friend;