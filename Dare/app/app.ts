import application = require("application");
import firebase = require("nativescript-plugin-firebase");
	firebase.init({
          // Optionally pass in properties for database, authentication and cloud messaging,
          // see their respective docs.
        }).then(
          (instance) => {
            console.log("firebase.init done");
          },
          (error) => {
            console.log("firebase.init error: " + error);
          }
        );
application.start({ moduleName: "Page/LoginPage/login" });
