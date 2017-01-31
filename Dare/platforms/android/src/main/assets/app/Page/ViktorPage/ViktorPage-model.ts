import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import LabelModule = require("ui/label");
import Page = require("ui/frame");
import firebase = require("nativescript-plugin-firebase");


var self;

class ViktorModel extends Observable{

    Color: string;
    Name: string;
    constructor(){
        super();
        self = this;
        this.Color = "Blue";
        this.Name = "Jolo";
        //this.set("Add", firebase.);
      
       
    }
    ChangeColor()
    {
        this.set("Name", "Hello");
        this.set("Color","Red");
        alert("Hello");
    }
} 

export default ViktorModel;