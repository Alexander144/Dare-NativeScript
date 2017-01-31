import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import LabelModule = require("ui/label");
import Page = require("ui/frame");
import firebase = require("nativescript-plugin-firebase");

var self;
class ViktorModel extends Observable{

    Name: string;

    constructor(){
        super();
        self = this;
        
        this.Name = "Jolo";
        //this.set("Add", firebase.);
      
       
    }
    ChangeColor()
    {
        this.set("Name", "Hello");
        alert("Hello");
    }
} 

export default ViktorModel;