import * as camera from "camera";
import { Image } from "ui/image";
import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";


var self;
var pagel;
class CameraModel extends Observable
{
    
    //PlaceholderImage: string;
    //PictureTaken: Observable<Image>;
    TWO: string;
    constructor()
    {
        super();

        self = this;
    }
    TakePicture()
    {

    }
} 

export default CameraModel;