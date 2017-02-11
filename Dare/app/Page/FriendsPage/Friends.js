"use strict";
var Friends_model_1 = require("./Friends-model");
var model = new Friends_model_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJpZW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZyaWVuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBS3hDLElBQUksS0FBSyxHQUFHLElBQUksdUJBQVMsRUFBRSxDQUFDO0FBRTVCLElBQUksVUFBVSxHQUFHLFVBQUMsSUFBZTtJQUM3QixjQUFjO0lBQ2YsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QiwwQkFBMEI7SUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFFNUIsMkNBQTJDO0lBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxvRUFBb0U7SUFDbkUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFeEMsQ0FBQztBQUNRLGtCQUFVLGNBRGxCO0FBQ3FCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1haW5Nb2RlbCBmcm9tIFwiLi9GcmllbmRzLW1vZGVsXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IE9ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxudmFyIG1vZGVsID0gbmV3IE1haW5Nb2RlbCgpO1xuXG52YXIgUGFnZUxvYWRlZCA9IChhcmdzOiBFdmVudERhdGEpID0+IHtcbiAgICAvL0hlbnRlciBzaWRlblxuICAgdmFyIHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcbiAgIC8vYmluZGVyIHZhcmlhYmxlbmUgc2FtbWVuXG4gICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbW9kZWw7XG4gICBcbiAgIC8vSGVudGVyIGRhdGEgc29tIGhhciBibGl0dCBzZW5kdCB0aWwgc2lkZW5cbiAgIHZhciBkYXRhID0gcGFnZS5uYXZpZ2F0aW9uQ29udGV4dDtcbiAgIC8vU2V0dGVyIG1ldG9kZW4gZm9yZGkgY29uc3RydWN0b3JlbiBrasO4cmVzIGbDuHIgamVnIGbDpXIgc2F0dCB2ZXJkaWVuXG4gICAgbW9kZWwuU2V0QXBwbGljYXRpb24oZGF0YS5Vc2VybmFtZSk7XG4gICBcbn1cbmV4cG9ydCB7IFBhZ2VMb2FkZWQgfTsiXX0=