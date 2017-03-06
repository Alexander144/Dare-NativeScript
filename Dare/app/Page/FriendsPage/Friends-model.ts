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
    FriendsSearch: ObservableArray<Friend>;
    AddUser: string;
    InputDare: string;
    path: string;
    Score: number;

    ObsUser: any;

    constructor()
    {
        super();
        
        this.Friends = new ObservableArray<Friend>();
        this.FriendsAsk = new ObservableArray<Friend>();
        this.FriendsSearch = new ObservableArray<Friend>();
    }

    SearchUser()
    {
        while(this.FriendsSearch.length > 0)
        {
            this.FriendsSearch.pop();
        }

        if(this.AddUser != null && this.AddUser != "")
        {
            var onChildEvent = function(result:any) 
            {
            if (result.type === "ChildAdded") 
            {  
                    if(self.CheckUpUser(result.key)==true)
                    {
                        self.AddSearchUser(result.key);
                    } 
                }
            }
        // listen to changes in the /users path
            this.path = "/Users";
            firebase.addChildEventListener(onChildEvent,this.path);
        }
        else
        {
            alert("No element to search");
        }
    }

    AddSearchUser(FriendsName: string)
    {
        this.FriendsSearch.push(new Friend(this.Username,FriendsName,false));
    }

    CheckUpUser(FriendsName:string)
    {
        let ThisFriend:Array<boolean>;
         ThisFriend = new Array<boolean>();

            for(var i = 0; i<this.AddUser.length; i++)
            {
               if(this.AddUser[i] == FriendsName[i])
               {
                   ThisFriend.push(true);
               }
               else
               {
                   ThisFriend.push(false);
               }
            }

            for(var l = 0; l<ThisFriend.length; l++){
                if(ThisFriend[l] == false){
                    return false;
                }
            }

            if(FriendsName == this.Username){
                return false;
            }

            return true;
    }

    AddThisUser()
    {
        var ThisAddUser = this.AddUser;
        var onUser = true;

        if(this.AddUser == null)
        {
            alert("Not a valid User");
        }
        else
        {
            var onChildEvent = function(result:any) 
            {
                if (result.type === "ChildAdded") 
                {   
                    if(self.UserConfirmed(self.AddUser, result.key) == true)
                    {
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

        if(SearchUser.toLocaleLowerCase() == DatabaseUser.toLocaleLowerCase()&&SearchUser.toLocaleLowerCase()!= this.Username.toLowerCase())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    SendToUser(ThisAddUser:String)
    {
        firebase.setValue("Users/"+ThisAddUser+"/Friends/Request/"+this.Username , false);
    }
    GetDares()
    {
        var onChildEvent = function(result:any) 
        {
            if(result.type==="ChildRemoved")
            {
                self.deleteDare(result.key);
            }
            if (result.type === "ChildAdded") 
            {   
                        self.newDare(result.key, result.value.Dare, result.value.From);
            }
        }
        // listen to changes in the /users path
            this.path = "/Dares/"+this.Username;
            firebase.addChildEventListener(onChildEvent,this.path);
            this.path = "";
    }

    SetApplication(Username:string)
    {
        self = this;
        this.Username = Username;
        this.set("GUIUser",this.Username);
        this.GetRequest();
        this.GetFriends();
    }
 
    GetScore()
    {
        var onChildEvent = function(result:any) 
        {
            self.SetUIScore(result.value);
        }
        var path = "/Users/"+this.Username + "/Score";
        firebase.addValueEventListener(onChildEvent,path);
    }

    SetUIScore(AScore:number)
    {
        this.set("Score", AScore);
    }

    SetScore()
    {
        let adding = 10;
        var Result = this.Score;
        Result = Result + adding;
          firebase.update(
            '/Users/' + this.Username,
            {'Score': Result}
            );
    }

    GetFriends()
    {
         var onChildEvent = function(result:any) 
         {
            if(result.type === "ChildAdded")
             {
                if(self.SetFriends(result.key) == true)
                {
                    self.AddFriendsToList(result.key);
                }
            }

            if(result.type === "ChildRemoved")
            {
                self.DeleteFriend(result.key);
            }
        }
        var path = "/Users/"+this.Username + "/Friends/Accept";
        firebase.addChildEventListener(onChildEvent,path);
    }

    GetRequest()
    {
        var onChildEvent = function(result:any) 
        {
            if(result.type === "ChildAdded") 
            {   
                self.SetRequest(result.key);
            }
            
            if (result.type === "ChildRemoved") 
            {
                self.DeleteRequest(result.key);
            }
        }
        // listen to changes in the /users path
        this.path = "/Users/"+this.Username +"/Friends/Request";
        firebase.addChildEventListener(onChildEvent,this.path);
    }

    SetRequest(friend: string)
    {
        this.FriendsAsk.push(new Friend(this.Username,friend,false));
    }

    DeleteRequest(friend: string)
    {
         for (var i=0;i<this.FriendsAsk.length;i++) 
         {
            if (this.FriendsAsk.getItem(i).FriendsUsername.toLowerCase() === friend.toLowerCase()) 
            {
               this.FriendsAsk.splice(i,1);
            }   
        }
    }

    DeleteFriend(friend: string)
    {
         for (var i=0;i<this.Friends.length;i++) 
         {
            if (this.Friends.getItem(i).FriendsUsername.toLowerCase() === friend.toLowerCase()) 
            {
               this.Friends.splice(i,1);
            }   
        }
    }

    SetFriends(AFriend: string)
    {
        var AddFriend = true;
        for (var i=0;i<this.Friends.length;i++) 
        {
            if (this.Friends.getItem(i).FriendsUsername.toLowerCase() === AFriend.toLowerCase()) 
            {
                AddFriend = false;
            }   
        }
        return AddFriend;
    }

    AddFriendsToList(AFriend:string)
    {
        this.Friends.push(new Friend(this.Username, AFriend, true));
    }

    GoBack()
    {
        
        while(this.Friends.length > 0)
        {
            this.Friends.pop();
        }

        while(this.FriendsAsk.length > 0)
        {
            this.FriendsAsk.pop();
        }

        while(this.FriendsSearch.length > 0)
        {
            this.FriendsSearch.pop();
        }

        this.AddUser = null;
        this.Username = null;
        this.path = null;
        Page.topmost().goBack();
    }
  
} 

export default MainModel;