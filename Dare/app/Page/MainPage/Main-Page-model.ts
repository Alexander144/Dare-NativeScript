import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import listPickerModule = require("ui/list-picker");
import {EventData} from "data/observable";

import Page = require("ui/frame");
import Dare from "../Class/Dare/Dare";

 var self;
class MainModel extends Observable{
    Dares: ObservableArray<Dare>;
    User: string;
    Username: string;
    InputDare: string;
    Score: number;
    Image: string;

    constructor()
    {
        super();
        this.Dares = new ObservableArray<Dare>();
        this.User = null;
        this.Score = 0;
        this.Image = "https://1.bp.blogspot.com/-YIfQT6q8ZM4/Vzyq5z1B8HI/AAAAAAAAAAc/UmWSSMLKtKgtH7CACElUp12zXkrPK5UoACLcB/s1600/image00.png";
       
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
    
    GetDares()
    {
        let path: string;
        var onChildEvent = function(result:any) 
        {
            if(result.type==="ChildRemoved")
            {
                self.DeleteDare(result.key);
            }
            if (result.type === "ChildAdded") 
            {

                if(self.CheckIfDareAdded(result.key) == true)
                {
                self.NewDare(result.key, result.value.Dare, result.value.From);
                }
            }
        }
            // listen to changes in the /users path
            path = "/Dares/"+this.User;
            firebase.addChildEventListener(onChildEvent,path);
            path = "";
    }
    GetScore()
    {    
        var onChildEvent = function(result:any) 
        {
            self.SetUIScore(result.value);
        }
        var path = "/Users/"+this.User + "/Score";
        firebase.addValueEventListener(onChildEvent,path);
    }

    CheckIfDareAdded(id:string)
    {
        var AddDare = true;
        for (var i=0;i<this.Dares.length;i++) 
        {
            if (this.Dares.getItem(i).Id === id) 
            {
                AddDare = false;
            }   
        }
        return AddDare;
    }
    
    DeleteDare(id:string)
    {
        this.SetScore();
        for (var i=0;i<this.Dares.length;i++) 
        {
            if (this.Dares.getItem(i).Id === id) 
            {
                this.Dares.splice(i,1);
                break;
            }
        }
    }

    NewDare(id:string, nDare:string, From:string)
    {
        this.Dares.push(new Dare(id,nDare,From,this.User));
    }

    SendDare()
    { 
        firebase.uploadFile({
        // the full path of the file in your Firebase storage (folders will be created)
        remoteFullPath: 'uploads/images/telerik-logo-uploaded.png',
        // option 2: a full file path (ignored if 'localFile' is set)
        localFullPath: this.Image,
        // get notified of file upload progress
        onProgress: function(status) {
          console.log("Uploaded fraction: " + status.fractionCompleted);
          console.log("Percentage complete: " + status.percentageCompleted);
        }
      }).then(
            (uploadedFile) => {
              console.log("File uploaded: " + JSON.stringify(uploadedFile));
            },
            (error) => {
            console.log("firebase.keepInSync error: " + error);
        });

        Page.topmost().navigate(
        {
            moduleName: "Page/SendTo/SendTo",
            context:{Username: this.User, Dare:this.InputDare
            },
            transition: {
                name: "slideBottom",
                duration: 380,
                curve: "easeIn"
            },
            animated: true
        }
        );
    }

    SetApplication(Username:string)
    {
        self = this;
        this.User = Username;
        this.set("GUIUser",this.User);
        this.GetDares();
        this.GetScore();
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
            '/Users/' + this.User,
            {'Score': Result}
        );
    }

    GoToFriendsPage()
    {
        Page.topmost().navigate(
        {
            moduleName: "Page/FriendsPage/Friends",
             context:{Username: this.User
                },
            transition: {
                name: "slideBottom",
                duration: 380,
                curve: "easeIn"
             },
            animated: true
            }
            );
    }
    
    Logout()
    {
        this.User = "";
        this.set("Username","");
        this.set("InputDare","");
        while(this.Dares.length > 0)
        {
            this.Dares.pop();
        }

        firebase.logout();
        
        Page.topmost().goBack();
    }
  
} 

export default MainModel;