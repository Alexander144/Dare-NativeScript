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
        SignUpConfirm = true;
     
        
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
       
        Username = this.get("Username");
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
       firebase.addChildEventListener(this.onChildEvent, "/Users");
       
      if(SignUpConfirm == true){
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
       else{
           alert("Username already taken");
       }
       SignUpConfirm = true;
    }
    onChildEvent(result) {
         
              console.log("Event type: " + result.type);
             console.log("Key: " + JSON.stringify(result.key));
             
            console.log("Value: " + JSON.stringify(result.value));
            console.log("UserName is§§::" + Username);
           
                if(result.key == Username){
                    console.log("Dette er::::::"+result.key + Username);
                   SignUpConfirm = false;
                   
                }
               
    }
    Send(){
        firebase.push("Users", "lolll");
        this.items.push(new item("Hello"));
    }
} 

export default LoginModel;