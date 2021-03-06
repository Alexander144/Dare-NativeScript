"use strict";
var Main_Page_model_1 = require("./Main-Page-model");
var model = new Main_Page_model_1.default();
var PageLoaded = function (args) {
    //Henter siden
    var page = args.object;
    //binder variablene sammen
    page.bindingContext = model;
    //Henter data som har blitt sendt til siden
    var data = page.navigationContext;
    //Setter metoden fordi constructoren kjøres før jeg får satt verdien
    model.SetApplication(data.Username);
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi1QYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWFpbi1QYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBc0IsbUJBQW1CLENBQUMsQ0FBQTtBQUsxQyxJQUFJLEtBQUssR0FBRyxJQUFJLHlCQUFTLEVBQUUsQ0FBQztBQUU1QixJQUFJLFVBQVUsR0FBRyxVQUFDLElBQWU7SUFDN0IsY0FBYztJQUNmLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBRTVCLDJDQUEyQztJQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsb0VBQW9FO0lBQ25FLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXhDLENBQUM7QUFDUSxrQkFBVSxjQURsQjtBQUNxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYWluTW9kZWwgZnJvbSBcIi4vTWFpbi1QYWdlLW1vZGVsXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuXHJcbnZhciBtb2RlbCA9IG5ldyBNYWluTW9kZWwoKTtcclxuXHJcbnZhciBQYWdlTG9hZGVkID0gKGFyZ3M6IEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgLy9IZW50ZXIgc2lkZW5cclxuICAgdmFyIHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgLy9iaW5kZXIgdmFyaWFibGVuZSBzYW1tZW5cclxuICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG1vZGVsO1xyXG4gICBcclxuICAgLy9IZW50ZXIgZGF0YSBzb20gaGFyIGJsaXR0IHNlbmR0IHRpbCBzaWRlblxyXG4gICB2YXIgZGF0YSA9IHBhZ2UubmF2aWdhdGlvbkNvbnRleHQ7XHJcbiAgIC8vU2V0dGVyIG1ldG9kZW4gZm9yZGkgY29uc3RydWN0b3JlbiBrasO4cmVzIGbDuHIgamVnIGbDpXIgc2F0dCB2ZXJkaWVuXHJcbiAgICBtb2RlbC5TZXRBcHBsaWNhdGlvbihkYXRhLlVzZXJuYW1lKTtcclxuICAgXHJcbn1cclxuZXhwb3J0IHsgUGFnZUxvYWRlZCB9OyJdfQ==