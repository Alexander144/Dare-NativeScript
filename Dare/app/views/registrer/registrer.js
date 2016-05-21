var frameModule = require("ui/frame");

exports.Pop = function(){
	frameModule.topmost().navigate("views/password");
}