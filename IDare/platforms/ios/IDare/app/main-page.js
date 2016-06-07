var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
   /* var page = args.object;
    if(!Sqlite.exists("../../Database/IDare.db")){
    	Sqlite.copyDatabase("../../Database/IDare.db");
    }
    (new Sqlite("../../Database/IDare.db")).then(db => {
    	database = db;
    	db.execSQL("Create Table If Not exists user(ID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Email TEXT, Password TEXT)").then(ID=>{
    		page.bindingContect = createViewModel(db);
    	}, error => {
    		console.log("Create Table Error", error);
    	
    	});
    }, error => {
    	console.log("Open Db Error", error);
    });*/
}
exports.onNavigatingTo = onNavigatingTo;