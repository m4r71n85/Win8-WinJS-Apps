/// <reference path="dom-logger.js" />
/// <reference path="vegitable.js" />
/// <reference path="cucumber.js" />
/// <reference path="tomatoGmo.js" />
/// <reference path="tomato.js" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    var app = WinJS.Application;
    app.onactivated = function (args) {
    	console = new DomLogger(document.getElementById("output"));
		////GMO tomato
    	var gmoTomato = new VegitableKingdom.Gmo.TomatoGmo("GMO red", 20);
    	console.log(gmoTomato.toString());
    	console.log(gmoTomato.addWater(1));
    	console.log(gmoTomato.toString());

		////Green cucumber
    	var greenCucumber = new VegitableKingdom.Natural.Cucumber("green", 15);
    	console.log(greenCucumber.toString());

    	//Pink tomato
    	var pinkTomato = new VegitableKingdom.Natural.Tomato("pink", 10);
    	console.log(pinkTomato.toString());


    	
    };

    app.start();
})();
