import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

import Page = require("ui/frame");
import item from "../Class/item/item";
import firebase = require("nativescript-plugin-firebase");
 var SignUpConfirm;
 var Username;
class LoginModel extends Observable{

    
   items: ObservableArray<item>;

   Add: string;

   LoginEmail: string;
   LoginPassword: string;   

    constructor(){
        super();
        this.items = new ObservableArray<item>();
        SignUpConfirm = false;
     
        
        //this.set("Add", firebase.);
      
       
    }

    login(){
       
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        
      
        console.debug(this.LoginEmail);
        firebase.login({ type: firebase.LoginType.PASSWORD, 
                        email: this.LoginEmail,
                        password: this.LoginPassword }).then((user) => {
            this.set("Email", null);
            this.set("Password", null);
            //alert("UserID" + user.uid);
            Page.topmost().navigate({
            moduleName: "Page/MainPage/Main-Page",
            transition: {
                name: "slideBottom",
                duration: 380,
                curve: "easeIn"
             },
            animated: true
            });
            
        },(error) => {
            alert("Error:" + error);
        });
    }
    SignUp(){
       
        Username = this.get("Username");
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        firebase.createUser({ email: this.LoginEmail,
                        password: this.LoginPassword }).then((user) => {
            this.set("Email", null);
            this.set("Password", null);
            alert("UserID" + user.key);
            firebase.setValue("Users/"+this.get("Username"),{ 'ID' : user.key});
        },(error) => {
            alert("Error: " + error);
        });
    }
    Send(){
        firebase.push("","hello");
        this.items.push(new item("Hello"));
    }
} 

export default LoginModel;