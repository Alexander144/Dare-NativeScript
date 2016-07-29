"use strict";
var application = require("application");
var firebase = require("nativescript-plugin-firebase");
firebase.init({}).then(function (instance) {
    console.log("firebase.init done");
}, function (error) {
    console.log("firebase.init error: " + error);
});
application.start({ moduleName: "Page/Login/login" });
//# sourceMappingURL=app.js.map