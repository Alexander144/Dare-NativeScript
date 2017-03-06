"use strict";
var camera = require("camera");
var image_1 = require("ui/image");
var firebase = require("nativescript-plugin-firebase");
var observable_1 = require("data/observable");
var self;
var CameraModel = (function (_super) {
    __extends(CameraModel, _super);
    function CameraModel() {
        _super.call(this);
        this.TakePictureText = "Take a picture";
        this.PictureTaken = "https://placehold.it/150x150";
        this.AccepDareButtonHide = "collapse";
        this.DareFrom = "Username";
        self = this;
    }
    CameraModel.prototype.TakePicture = function () {
        var _this = this;
        camera.takePicture({ width: 70, height: 70, keepAspectRatio: false }).then(function (picture) {
            _this.set('PictureTaken', picture);
            var image = new image_1.Image();
            image.imageSource = picture;
            _this.set('TakePictureText', "Take a new picture");
            _this.set('AccepDareButtonHide', "visible");
        });
    };
    CameraModel.prototype.SetApplication = function (DareToAccept) {
        this.DareToAccept = DareToAccept;
        this.set('OutputDare', this.DareToAccept.OutputDare);
        this.set('DareFrom', this.DareToAccept.From);
    };
    CameraModel.prototype.AcceptDareWithPicture = function () {
        firebase.uploadFile({
            // the full path of the file in your Firebase storage (folders will be created)
            remoteFullPath: 'uploads/images/Image.png',
            // option 1: a file-system module File object
            localFile: "",
            // option 2: a full file path (ignored if 'localFile' is set)
            //localFullPath: picture.src,
            // get notified of file upload progress
            onProgress: function (status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(function (uploadedFile) {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
        }, function (error) {
            console.log("File upload error: " + error);
        });
    };
    return CameraModel;
}(observable_1.Observable));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CameraModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FtZXJhLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2FtZXJhLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUNqQyxzQkFBc0IsVUFBVSxDQUFDLENBQUE7QUFDakMsSUFBTyxRQUFRLFdBQVcsOEJBQThCLENBQUMsQ0FBQztBQUMxRCwyQkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUk1QyxJQUFJLElBQUksQ0FBQztBQUNUO0lBQTBCLCtCQUFVO0lBVWhDO1FBRUksaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUE7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyw4QkFBOEIsQ0FBQztRQUNuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksR0FBRyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELGlDQUFXLEdBQVg7UUFBQSxpQkFTQztRQVBELE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztZQUM3RSxLQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUNsRCxLQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELG9DQUFjLEdBQWQsVUFBZSxZQUFrQjtRQUU3QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFakQsQ0FBQztJQUNELDJDQUFxQixHQUFyQjtRQUVJLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDWiwrRUFBK0U7WUFDL0UsY0FBYyxFQUFFLDBCQUEwQjtZQUMxQyw2Q0FBNkM7WUFDN0MsU0FBUyxFQUFFLEVBQUU7WUFDYiw2REFBNkQ7WUFDN0QsNkJBQTZCO1lBQzdCLHVDQUF1QztZQUN2QyxVQUFVLEVBQUUsVUFBUyxNQUFNO2dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7U0FDRixDQUFDLENBQUMsSUFBSSxDQUNILFVBQVUsWUFBWTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLEVBQ0QsVUFBVSxLQUFLO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFDWCxrQkFBQztBQUFELENBQUMsQUEzREQsQ0FBMEIsdUJBQVUsR0EyRG5DO0FBRUQ7a0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJjYW1lcmFcIjtcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgRGFyZSBmcm9tIFwiLi4vQ2xhc3MvRGFyZS9EYXJlXCI7XHJcblxyXG52YXIgc2VsZjtcclxuY2xhc3MgQ2FtZXJhTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlXHJcbntcclxuICAgIFBpY3R1cmVUYWtlbjogc3RyaW5nO1xyXG4gICAgVGFrZVBpY3R1cmVUZXh0OiBzdHJpbmc7XHJcbiAgICBBY2NlcERhcmVCdXR0b25IaWRlOiBzdHJpbmc7XHJcbiAgICAvL0RhcmVcclxuICAgIERhcmVUb0FjY2VwdDogRGFyZTtcclxuICAgIE91dHB1dERhcmU6IHN0cmluZztcclxuICAgIERhcmVGcm9tOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7IFxyXG4gICAgICAgIHRoaXMuVGFrZVBpY3R1cmVUZXh0ID0gXCJUYWtlIGEgcGljdHVyZVwiXHJcbiAgICAgICAgdGhpcy5QaWN0dXJlVGFrZW4gPSBcImh0dHBzOi8vcGxhY2Vob2xkLml0LzE1MHgxNTBcIjtcclxuICAgICAgICB0aGlzLkFjY2VwRGFyZUJ1dHRvbkhpZGUgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgdGhpcy5EYXJlRnJvbSA9IFwiVXNlcm5hbWVcIjtcclxuICAgICAgICBzZWxmID0gdGhpcztcclxuICAgIH1cclxuICAgIFRha2VQaWN0dXJlKClcclxuICAgIHtcclxuICAgIGNhbWVyYS50YWtlUGljdHVyZSh7d2lkdGg6IDcwLCBoZWlnaHQ6IDcwLCBrZWVwQXNwZWN0UmF0aW86IGZhbHNlfSkudGhlbigocGljdHVyZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0KCdQaWN0dXJlVGFrZW4nLCBwaWN0dXJlKTtcclxuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS5pbWFnZVNvdXJjZSA9IHBpY3R1cmU7XHJcbiAgICAgICAgdGhpcy5zZXQoJ1Rha2VQaWN0dXJlVGV4dCcsIFwiVGFrZSBhIG5ldyBwaWN0dXJlXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0KCdBY2NlcERhcmVCdXR0b25IaWRlJywgXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgU2V0QXBwbGljYXRpb24oRGFyZVRvQWNjZXB0OiBEYXJlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuRGFyZVRvQWNjZXB0ID0gRGFyZVRvQWNjZXB0O1xyXG4gICAgICAgIHRoaXMuc2V0KCdPdXRwdXREYXJlJywgdGhpcy5EYXJlVG9BY2NlcHQuT3V0cHV0RGFyZSk7XHJcbiAgICAgICAgdGhpcy5zZXQoJ0RhcmVGcm9tJywgdGhpcy5EYXJlVG9BY2NlcHQuRnJvbSk7XHJcblxyXG4gICAgfVxyXG4gICAgQWNjZXB0RGFyZVdpdGhQaWN0dXJlKClcclxuICAgIHtcclxuICAgICAgICBmaXJlYmFzZS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcclxuICAgICAgICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiAndXBsb2Fkcy9pbWFnZXMvSW1hZ2UucG5nJyxcclxuICAgICAgICAgICAgICAgIC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgbG9jYWxGaWxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uIDI6IGEgZnVsbCBmaWxlIHBhdGggKGlnbm9yZWQgaWYgJ2xvY2FsRmlsZScgaXMgc2V0KVxyXG4gICAgICAgICAgICAgICAgLy9sb2NhbEZ1bGxQYXRoOiBwaWN0dXJlLnNyYyxcclxuICAgICAgICAgICAgICAgIC8vIGdldCBub3RpZmllZCBvZiBmaWxlIHVwbG9hZCBwcm9ncmVzc1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJjZW50YWdlIGNvbXBsZXRlOiBcIiArIHN0YXR1cy5wZXJjZW50YWdlQ29tcGxldGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodXBsb2FkZWRGaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbn0gXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1lcmFNb2RlbDsiXX0=