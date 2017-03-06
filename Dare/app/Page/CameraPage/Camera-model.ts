import * as camera from "camera";
import { Image } from "ui/image";
import firebase = require("nativescript-plugin-firebase");
import{ Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import Dare from "../Class/Dare/Dare";

var self;
class CameraModel extends Observable
{
    PictureTaken: string;
    TakePictureText: string;
    AccepDareButtonHide: string;
    //Dare
    DareToAccept: Dare;
    OutputDare: string;
    DareFrom: string;

    constructor()
    {
        super(); 
        this.TakePictureText = "Take a picture"
        this.PictureTaken = "https://placehold.it/150x150";
        this.AccepDareButtonHide = "collapse";
        this.DareFrom = "Username";
        self = this;
    }
    TakePicture()
    {
    camera.takePicture({width: 70, height: 70, keepAspectRatio: false}).then((picture) => {
        this.set('PictureTaken', picture);
        var image = new Image();
        image.imageSource = picture;
        this.set('TakePictureText', "Take a new picture");
        this.set('AccepDareButtonHide', "visible");
        });
    }
    SetApplication(DareToAccept: Dare)
    {
        this.DareToAccept = DareToAccept;
        this.set('OutputDare', this.DareToAccept.OutputDare);
        this.set('DareFrom', this.DareToAccept.From);

    }
    AcceptDareWithPicture()
    {
        firebase.uploadFile({
                // the full path of the file in your Firebase storage (folders will be created)
                remoteFullPath: 'uploads/images/Image.png',
                // option 1: a file-system module File object
                localFile: "",
                // option 2: a full file path (ignored if 'localFile' is set)
                //localFullPath: picture.src,
                // get notified of file upload progress
                onProgress: function(status) {
                  console.log("Uploaded fraction: " + status.fractionCompleted);
                  console.log("Percentage complete: " + status.percentageCompleted);
                }
              }).then(
                  function (uploadedFile) {
                    console.log("File uploaded: " + JSON.stringify(uploadedFile));
                  },
                  function (error) {
                    console.log("File upload error: " + error);
                  }
              );
          }
} 

export default CameraModel;