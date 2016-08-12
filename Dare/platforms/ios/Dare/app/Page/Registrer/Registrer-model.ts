import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

import firebase = require("nativescript-plugin-firebase");

class RegistrerModel extends Observable{

   Add: string;

   LoginEmail: string;
   LoginPassword: string;   

    constructor(){
        super();
       
     
        
        //this.set("Add", firebase.);
      
       
    }
    Registrer(){
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        
      
        console.debug(this.LoginEmail);
        firebase.createUser({ email: this.LoginEmail,
                        password: this.LoginPassword }).then((user) => {
            this.set("Email", null);
            this.set("Password", null);
            alert("UserID" + user.key);
        },(error) => {
            alert("Error" + error);
        });
        //this.items.push(new item(this.Add));
        
      
        //firebase.push('',"Hello");
    }
} 

export default RegistrerModel;