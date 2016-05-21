var frameModule = require("ui/frame");
var counter = 0;
var lblCounter;
//Denne kobler sammen med koden i login.xml args er side objekte. Kan da lagre det i en variabel og hente id eller klasser
exports.pageLoaded = function(args){
	var page = args.object;
	lblCounter = page.getViewById("lblCounter");
}
exports.Pop = function(){
	var ChangeView = frameModule.topmost();
	ChangeView.navigate("views/registrer/registrer");

}
exports.submit = function(){
	counter++;
	lblCounter.text = counter + "taps";
}
