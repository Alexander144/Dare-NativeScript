import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import LabelModule = require("ui/label");
import Page = require("ui/frame");
import firebase = require("nativescript-plugin-firebase");

var self;
class LoginModel extends Observable{

   Username: string;
   Add: string;
   message: Observable;
   LoginEmail: string;
   LoginPassword: string;   

    constructor(){
        super();
        self = this;
        
       
        //this.set("Add", firebase.);
      
       
    }

    login(){
       
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        
        firebase.login({ type: firebase.LoginType.PASSWORD, 
                        email: this.LoginEmail,
                        password: this.LoginPassword }).then((user) => {
            this.set("Email", null);
            this.set("Password", null);
            this.GetUsername(user.uid);
            
        },(error) => {
            alert("Error:" + error);
        });
    }
    GetUsername(uid:string){
        var user;
       var onChildEvent = function(result:any) {
            if (result.type === "ChildAdded") {
                if(result.value.ID == uid){
        Page.topmost().navigate({
            
            moduleName: "Page/MainPage/Main-Page",
             context:{Username: result.key
                },
            transition: {
                name: "slideBottom",
                duration: 380,
                curve: "easeIn"
             },
            animated: true
            });
                 
                }
        //console.log(result.value.ID);
        //console.log(result.type);
        //console.log(result.key);
            }
     }
    // listen to changes in the /users path
    firebase.addChildEventListener(onChildEvent, "/Users");
    }
    SignUp(){
       
        this.LoginEmail = this.get("Email");
        this.LoginPassword = this.get("Password");
        firebase.createUser({ email: this.LoginEmail,
                        password: this.LoginPassword }).then((user) => {
            this.set("Email", null);
            this.set("Password", null);
            alert("Sucess");
            firebase.setValue("Users/"+this.get("Username"),{ 'ID' : user.key,'Score' : 0});
        },(error) => {
            alert("Error: " + error);
        });
    }
    Send(){
        firebase.push("","hello");
    }
} 

export default LoginModel;