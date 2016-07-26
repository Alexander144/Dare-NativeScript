import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import Dare from "../Class/Dare/Dare";

class MainModel extends Observable{
    Dares: ObservableArray<Dare>;
    User: string;
    m_Dare: string;
    m_Key: Array<string>;
    m_From: Array<string>;

    constructor(){
        super();
        this.Dares = new ObservableArray<Dare>();
       
        this.GetDares();
    }
    GetDares(){
        
    var onChildEvent = function(result) {
    
         if (result.type === "ChildAdded") {
               console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value.Dare));
                this.set("lol", JSON.stringify(result.value.Dare));
         }
     };

    // listen to changes in the /users path
    firebase.addChildEventListener(onChildEvent, "/Dares/Lol12345");
     this.Dares.push(new Dare("1","lol","leel"));
        //this.Dares.push(new Dare("12","Eat", this.User));
    }
    authDataCallback(authData) {
     if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
     } else {
      console.log("User is logged out");
     }
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