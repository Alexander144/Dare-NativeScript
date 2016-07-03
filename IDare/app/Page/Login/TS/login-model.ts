import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import item from "./Class/item";

class IDareModel extends Observable{

   items: ObservableArray<item>;
    
    constructor(){
        super();
        this.items = new ObservableArray<item>();
        this.items.push(new item("Supp"));
       
    }
    login(){
    
    }
} 

export default IDareModel;