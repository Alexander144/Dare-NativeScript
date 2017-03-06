import application = require("application");
import firebase = require("nativescript-plugin-firebase");
	firebase.init({
  
          storageBucket: 'gs://dare-662df.appspot.com'
        }).then(
          (instance) => {
            console.log("firebase.init done");
          },
          (error) => {
            console.log("firebase.init error: " + error);
          }
        );
application.start({ moduleName: "Page/LoginPage/login" });
