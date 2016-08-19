import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import {EventData} from "data/observable";

import Page = require("ui/frame");
import Dare from "../Class/Dare/Dare";

 var self;
class MainModel extends Observable{
    Dares: ObservableArray<Dare>;
    User: string;
    Username: string;
    InputDare: string;
    path: string;

    constructor(){
        super();
        this.Dares = new ObservableArray<Dare>();
        this.User = null;
       
    }
    
    GetDares(){
    
        var onChildEvent = function(result:any) {
        if(result.type==="ChildChanged"){
            alert(result.key + JSON.stringify(result.value.Dare) + JSON.stringify(result.value.From));
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

    newDare(id:string, nDare:string, From:string){
            this.Dares.push(new Dare(id,nDare,From));
    }

    Send(){
        firebase.push("Dares/"+this.Username,{'From': this.User, 'Dare':this.InputDare});
        this.set("Username","");
        this.set("InputDare","");
        
    }

    SetApplication(Username:string){
        self = this;
        this.User = Username;
        this.set("SUser",this.User);
        this.GetDares();
    }

    Logout(){
        this.path = "";
        this.User = "";
        this.set("Username","");
        this.set("InputDare","");
        while(this.Dares.length > 0){
            this.Dares.pop();
        }
        firebase.logout();

         Page.topmost().goBack();
    }
  
} 

export default MainModel;