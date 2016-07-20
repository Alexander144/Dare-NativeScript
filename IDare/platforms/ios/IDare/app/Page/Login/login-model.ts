import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

import Page = require("ui/frame");
import item from "./Class/item";
import firebase = require("nativescript-plugin-firebase");

class LoginModel extends Observable{

    
   items: ObservableArray<item>;

   Add: string;

   LoginEmail: string;
   LoginPassword: string;   

    constructor(){
        super();
        this.items = new ObservableArray<item>();
         
     
        
        //this.set("Add", firebase.);
      
       
    }

    login(){
       
        var navigationEntry = {
            moduleName: "details-page",
            context: { info: "something you want to pass to your page" },
         animated: false
        };
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
        //this.items.push(new item(this.Add));
        
      
        //firebase.push('',"Hello");
    }
    SignUp(){
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
      
        console.debug(this.LoginEmail);
        firebase.createUser({ email: this.LoginEmail,
                        password: this.LoginPassword }).then((user) => {
            this.set("Email", null);
            this.set("Password", null);
            alert("UserID" + user.key);
        },(error) => {
            alert("Error: " + error);
        });
    }
    Send(){
    
        firebase.push("idare-8f8b1",this.LoginEmail);
    }
} 

export default LoginModel;