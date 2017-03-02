import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import listPickerModule = require("ui/list-picker");
import {EventData} from "data/observable";

import Page = require("ui/frame");
import Dare from "../Class/Dare/Dare";
import Friend from "../Class/Friend/Friend";

 var self;
class MainModel extends Observable{
    User: string;
    Dare: string;
    index: number;
    Friends: ObservableArray<Friend>;
  

    constructor(){
        super();
         this.Friends = new ObservableArray<Friend>();
        //Vet ikke om denne fungerer
          firebase.keepInSync(
             "/Dares", // which path in your Firebase needs to be kept in sync?
             true      // set to false to disable this feature again
            ).then(
            () => {
                console.log("firebase.keepInSync is ON for /Dares");
            },
            (error) => {
            console.log("firebase.keepInSync error: " + error);
        });
        
}

    Send(){
         for (var i=0;i<this.Friends.length;i++) {
            if (this.Friends.getItem(i).SelectedFriend === true) {
                this.Friends.getItem(i).Send(this.Dare);
             }   
        }
        Page.topmost().goBack();
    }

    SetApplication(Username:string, Dare:string){
        self = this;
        this.User = Username;
        this.Dare = Dare;
        this.set("SUser",this.User);
        if(this.SetFriends(this.User)){
            this.Friends.push(new Friend(this.User,this.User,true));
        }
        this.GetFriends();
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
        console.log("User" + this.User);
        let pathToFriends = "/Users/"+this.User + "/Friends/Accept";
        firebase.addChildEventListener(onChildEvent,pathToFriends);
    }
    SetFriends(AFriend: string){
    var AddFriend = true;
    //Kan bytte til .indexof. Søker igjennom array hvor elemente du vl ha ligger
    for (var i=0;i<this.Friends.length;i++) {
            if (this.Friends.getItem(i).FriendsUsername === AFriend) {
                AddFriend = false;
             }   
        }
        return AddFriend;
    }
    AddFriendsToList(AFriend:string){
        this.Friends.push(new Friend(this.User,AFriend,true));
        console.log("Key:" + AFriend);
    }

  
   GoBack(){
         while(this.Friends.length > 0){
            this.Friends.pop();
        }
         Page.topmost().goBack();
    }
  
} 

export default MainModel;