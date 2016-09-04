import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import {EventData} from "data/observable";

import Page = require("ui/frame");
import Friend from "../Class/Friend/Friend";

 var self;
class MainModel extends Observable{
   
   Username: string;
   

    Friends: ObservableArray<Friend>;
    FriendsAsk: ObservableArray<Friend>;
    AddUser: string;
    User: string;
    InputDare: string;
    path: string;
    Score: number;


    constructor(){
        super();
        
        this.Friends = new ObservableArray<Friend>();
        this.FriendsAsk = new ObservableArray<Friend>();
        /*this.Dares = new ObservableArray<Dare>();
        this.User = null;
        this.Score = 0;
          firebase.keepInSync(
             "/Dares", // which path in your Firebase needs to be kept in sync?
             true      // set to false to disable this feature again
            ).then(
            () => {
                console.log("firebase.keepInSync is ON for /Dares");
            },
            (error) => {
            console.log("firebase.keepInSync error: " + error);
        });*/
}
    AddThisUser(){
       var ThisAddUser = this.AddUser;
       var onUser = true;
        if(this.AddUser == null){
            alert("Not a valid User");
        }
        else{
        var onChildEvent = function(result:any) {
            if (result.type === "ChildAdded") {   
                        if(self.UserConfirmed(self.AddUser, result.key) == true){
                            self.SendToUser(result.key);
                            onUser = false;
                            return;
                        } 
                }
            }
        // listen to changes in the /users path
            this.path = "/Users";
            firebase.addChildEventListener(onChildEvent,this.path);
        }
    }

    UserConfirmed(SearchUser:string, DatabaseUser:string){

        if(SearchUser.toLocaleLowerCase() == DatabaseUser.toLocaleLowerCase()&&SearchUser.toLocaleLowerCase()!= this.User.toLowerCase()){
            return true;
        }
        else{
            return false;
        }
    }
    SendToUser(ThisAddUser:String){
        firebase.setValue("Users/"+ThisAddUser+"/Friends/Request/"+this.User , false);

    }
    GetDares(){
    
        var onChildEvent = function(result:any) {
        if(result.type==="ChildRemoved"){
            self.deleteDare(result.key);
        }
        if (result.type === "ChildAdded") {   
                    self.newDare(result.key, result.value.Dare, result.value.From);
            }
        }
        // listen to changes in the /users path
            this.path = "/Dares/"+this.User;
            firebase.addChildEventListener(onChildEvent,this.path);
            this.path = "";
    }
    
    /*deleteDare(id:string){
        this.SetScore();
    for (var i=0;i<this.Dares.length;i++) {
        if (this.Dares.getItem(i).Id === id) {
        this.Dares.splice(i,1);
        break;
    }
  }
        this.Dares.sort
    }*/
   

    Send(){
        firebase.push("Dares/"+this.Username,{'From': this.User, 'Dare':this.InputDare});
        this.set("Username","");
        this.set("InputDare","");
        
    }

    SetApplication(Username:string){
        self = this;
        this.User = Username;
        this.set("SUser",this.User);
        this.GetRequest();
        this.GetFriends();
        //this.GetDares();
        //this.GetScore();
    }

    GetScore(){
        
    var onChildEvent = function(result:any) {
            self.SetUIScore(result.value);
    }
        var path = "/Users/"+this.User + "/Score";
        firebase.addValueEventListener(onChildEvent,path);
        
    }
    SetUIScore(AScore:number){
        this.set("Score", AScore);
    }
    SetScore(){
        let adding = 10;
        var Result = this.Score;
        Result = Result + adding;
        alert(this.Score);
          firebase.update(
            '/Users/' + this.User,
            {'Score': Result}
            );
    }
    GetFriends(){
         var onChildEvent = function(result:any) {
             if(result.type === "ChildAdded"){
                 if(self.SetFriends(result.key) == true){
                    self.AddFriendsToList(result.key);
                 }
             }
              if(result.type === "ChildRemoved"){
                  self.DeleteFriend(result.key);
              }
    }
        var path = "/Users/"+this.User + "/Friends/Accept";
        firebase.addChildEventListener(onChildEvent,path);
    }
    GetRequest(){
          var onChildEvent = function(result:any) {
            if (result.type === "ChildAdded") {   
                     self.SetRequest(result.key);
                     alert(result.key);
                }
                   if (result.type === "ChildRemoved") {
                       self.DeleteRequest(result.key);
                    }
            }
        // listen to changes in the /users path
            this.path = "/Users/"+this.User+"/Friends/Request";
            firebase.addChildEventListener(onChildEvent,this.path);
    }
    SetRequest(friend: string){
        this.FriendsAsk.push(new Friend(this.User,friend,false));
    }
    DeleteRequest(friend: string){
         for (var i=0;i<this.FriendsAsk.length;i++) {
            if (this.FriendsAsk.getItem(i).FriendsUsername.toLowerCase() === friend.toLowerCase()) {
               this.FriendsAsk.splice(i,1);
             }   
        }
    }
    DeleteFriend(friend: string){
         for (var i=0;i<this.Friends.length;i++) {
            if (this.Friends.getItem(i).FriendsUsername.toLowerCase() === friend.toLowerCase()) {
               this.Friends.splice(i,1);
             }   
        }
    }
    SetFriends(AFriend: string){
    var AddFriend = true;
    for (var i=0;i<this.Friends.length;i++) {
            if (this.Friends.getItem(i).FriendsUsername.toLowerCase() === AFriend.toLowerCase()) {
                AddFriend = false;
             }   
        }
        return AddFriend;
    }
    AddFriendsToList(AFriend:string){
        this.Friends.push(new Friend(this.User, AFriend, true));
    }
    GoBack(){
         while(this.Friends.length > 0){
            this.Friends.pop();
        }
         while(this.FriendsAsk.length > 0){
            this.FriendsAsk.pop();
        }

    this.AddUser = null;
    this.User = null;
    this.path = null;
         Page.topmost().goBack();
    }
  
} 

export default MainModel;