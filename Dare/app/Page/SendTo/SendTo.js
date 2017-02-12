"use strict";
var SendTo_model_1 = require("./SendTo-model");
var model = new SendTo_model_1.default();
var PageLoaded = function (args) {
    //Henter siden
    var page = args.object;
    //binder variablene sammen
    page.bindingContext = model;
    //Henter data som har blitt sendt til siden
    var data = page.navigationContext;
    //Setter metoden fordi constructoren kjøres før jeg får satt verdien
    model.SetApplication(data.Username, data.Dare);
};
exports.PageLoaded = PageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VuZFRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VuZFRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBc0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUt2QyxJQUFJLEtBQUssR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQztBQUU1QixJQUFJLFVBQVUsR0FBRyxVQUFDLElBQWU7SUFDN0IsY0FBYztJQUNmLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBRTVCLDJDQUEyQztJQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsb0VBQW9FO0lBQ25FLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFbEQsQ0FBQztBQUNRLGtCQUFVLGNBRGxCO0FBQ3FCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1haW5Nb2RlbCBmcm9tIFwiLi9TZW5kVG8tbW9kZWxcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxudmFyIG1vZGVsID0gbmV3IE1haW5Nb2RlbCgpO1xyXG5cclxudmFyIFBhZ2VMb2FkZWQgPSAoYXJnczogRXZlbnREYXRhKSA9PiB7XHJcbiAgICAvL0hlbnRlciBzaWRlblxyXG4gICB2YXIgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAvL2JpbmRlciB2YXJpYWJsZW5lIHNhbW1lblxyXG4gICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbW9kZWw7XHJcbiAgIFxyXG4gICAvL0hlbnRlciBkYXRhIHNvbSBoYXIgYmxpdHQgc2VuZHQgdGlsIHNpZGVuXHJcbiAgIHZhciBkYXRhID0gcGFnZS5uYXZpZ2F0aW9uQ29udGV4dDtcclxuICAgLy9TZXR0ZXIgbWV0b2RlbiBmb3JkaSBjb25zdHJ1Y3RvcmVuIGtqw7hyZXMgZsO4ciBqZWcgZsOlciBzYXR0IHZlcmRpZW5cclxuICAgIG1vZGVsLlNldEFwcGxpY2F0aW9uKGRhdGEuVXNlcm5hbWUsZGF0YS5EYXJlKTtcclxuICAgXHJcbn1cclxuZXhwb3J0IHsgUGFnZUxvYWRlZCB9OyJdfQ==