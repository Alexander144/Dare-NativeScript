import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import LabelModule = require("ui/label");
import Page = require("ui/frame");

var self;
class ViktorModel extends Observable
{   
	Name: string;

    constructor()
    {
        super();
        //Self is for firebase connection
        self = this;
        this.Name = "Viktor app";
    }
    done()
    {
    	this.Name = "Alexander erbg kul";
        this.set("Name",this.Name);
    }
} 

export default ViktorModel;