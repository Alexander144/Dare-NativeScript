import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import Dare from "../Class/Dare/Dare";
var M_Dare;

 var self;
class MainModel extends Observable{
    Dares: ObservableArray<Dare>;
    User: string;
    lol: string;
    m_Dare: string;
    m_Key: Array<string>;
    m_From: Array<string>;

    constructor(){
        super();
        this.Dares = new ObservableArray<Dare>();
        this.m_Dare = "læl";
        this.set("m_Dare","lol");
        this.GetDares();
        self = this;
    }
  
    GetDares(){
        
  var onChildEvent = function(result:any) {
         if (result.type === "ChildAdded" && result.type != "undefined") {
               console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value.Dare));
                alert(result.key + JSON.stringify(result.value.Dare) + JSON.stringify(result.value.From));
            self.newDare(result.key, result.value.Dare, result.value.From);
            //self.Dares.push(new Dare("lol","2323","2323"));
            self.set("m_Dare","lol");
         }
     }
    // listen to changes in the /users path
    firebase.addChildEventListener(onChildEvent, "/Dares/Alexander144");
  
     //self.Dares.push(new Dare("1","lol","leel"));
        //this.Dares.push(new Dare("12","Eat", this.User));
    }
    newDare(id:string, nDare:string, From:string){
        this.Dares.push(new Dare(id,nDare,From));
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