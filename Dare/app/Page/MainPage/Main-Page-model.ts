import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import firebase = require("nativescript-plugin-firebase");
import Dare from "../Class/Dare/Dare";
var M_Dare;
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
       
        this.GetDares();
    }
    onChildEvent(result:any) {

      
         if (result.type === "ChildAdded" && result.type != "undefined") {
               console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value.Dare));
                M_Dare = JSON.stringify(result.value.Dare);

         }
     }
    GetDares(){
        

    // listen to changes in the /users path
    firebase.addChildEventListener(this.onChildEvent, "/Dares/Alexander144");
    this.set('M_Dare',M_Dare);
    console.log("This is::::::" + M_Dare);
    
     this.Dares.push(new Dare("1","lol","leel"));
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