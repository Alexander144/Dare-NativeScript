import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import item from "./Class/item";
import firebase = require("nativescript-plugin-firebase");

class IDareModel extends Observable{

    
   items: ObservableArray<item>;
    
   Add: string;
    constructor(){
        super();
        this.items = new ObservableArray<item>();


      
       
    }
    add(){
        this.items.push(new item(this.Add));
        this.set("Add", "");
        firebase.login({ type: firebase.LoginType.ANONYMOUS}).then((user) => {
            alert("UserID" + user.uid);
        },(error) => {
            alert("Error" + error);
        });
        //firebase.push(null,"fdgfgfg");
    }
} 

export default IDareModel;