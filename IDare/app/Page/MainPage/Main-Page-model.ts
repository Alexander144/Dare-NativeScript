import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import Dare from "../Class/Dare/Dare";

class MainModel extends Observable{
    Dares: ObservableArray<Dare>;
    User: string;

    constructor(){
        super();
        this.Dares = new ObservableArray<Dare>();
    
        this.GetDares();
    }
    GetDares(){
    
        var onChildEvent = function(result) {
        var matches = [];

            if (result.type === "ChildAdded") {            
                
                  this.Dares.push(new Dare("",result.Dare, result.From));
                
            }

            else if (result.type === "ChildRemoved") {

                matches.push(result);
                        
                matches.forEach(function(match) {
                    var index = this.Dares.indexOf(match);
                    this.Dares.splice(index, 1);                                     
                });

            }

        };
        return firebase.addChildEventListener(onChildEvent, "/Dares/Lol12345").then(
            function () {
              console.log("firebase.addChildEventListener added");
            },
            function (error) {
              console.log("firebase.addChildEventListener error: " + error);
            }
        )   
        //this.Dares.push(new Dare("12","Eat", this.User));
    }

    Send(){
        console.debug("Send");
        firebase.push("Dares/"+this.get("Username"),{'From': "Username", 'Dare':this.get("InputDare")});
        this.set("Username","");
        this.set("Dare","");
    }
    Logout(){
        firebase.logout();
    }
  
} 

export default MainModel;