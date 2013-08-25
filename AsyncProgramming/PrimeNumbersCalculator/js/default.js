/// <reference path="WorkersController.js" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
	
    app.onactivated = function (args) {

    	var amountOfWorkers = 3; // could be changed

    	var pathToWorker = "/js/primesWorker.js";
    	var labelFreeWorkers = "free-workers";
    	var submitButtonId = "find-primes";
    	var workerController = new WorkersController(amountOfWorkers, pathToWorker, labelFreeWorkers, submitButtonId);

		//Init variables
    	var rangeFrom = document.getElementById("range-from");
    	var rangeTo = document.getElementById("range-to");
    	var labelFrom = document.getElementById("label-from");
    	var labelTo = document.getElementById("label-to");
    	var fromVal = null;
    	var toVal = null;
    	var findPrimesButton = document.getElementById("find-primes");
    	

		//Init html
    	createDataContainers(amountOfWorkers); //generate div container(columns) for each worker
    	getRangeValues(); //parse range scroller values to int variables
    	setLabelValues(); //visualise scroller value to a label container above 
    	workerController.setLabel(); //update label that shows amount of free workers


    	rangeFrom.addEventListener("change", function () { //"to number" slider evebt handler
    		getRangeValues();
    		if (fromVal >= toVal) {
    			rangeTo.value = (fromVal + 1);
    			getRangeValues();
    		}
    		setLabelValues();
    	});

    	rangeTo.addEventListener("change", function () { //"from number" slider evebt handler
    		getRangeValues();
    		if (toVal <= fromVal) {
    			rangeFrom.value = (toVal - 1);
    			getRangeValues();
    		}
    		setLabelValues();
    	});

    	findPrimesButton.addEventListener("click", function () { //"submit button" event handler
    		var workerIndex = workerController.getFreeWorkerIndex();
    		if (workerIndex >= 0) {
    			workerController.useWorker(workerIndex, fromVal, toVal);
    		}
    		workerController.setLabel();
    		if (workerController.amountOfFreeWorkers == 0) {
    			this.disabled = true;
    		}
    	});

    	function getRangeValues() { //parse range scroller values to int variables
    		fromVal = (rangeFrom.value | 0);
    		toVal = (rangeTo.value | 0);
    	}

    	function setLabelValues() { //visualise scroller value to a label container above 
    		labelFrom.innerHTML = fromVal;
    		labelTo.innerHTML = toVal;
    	}

    	function createDataContainers(amountOfWorkers) { //generate div container(columns) for each worker
    		var avarageWidth = (90 / amountOfWorkers | 0) //80 total width / amount of columns
    		var mainContainer = document.getElementById("data-container");
    		for (var i = 0; i < amountOfWorkers; i++) {
    			var workerContainer = document.createElement("div");
    			workerContainer.style.width = avarageWidth + "%";
    			workerContainer.setAttribute("id", "primes-col-" + i);
    			workerContainer.setAttribute("class", "primes-list");
    			workerContainer.innerText = "Worker " + (i + 1);
    			mainContainer.appendChild(workerContainer);
    		}
    	}
    };

    app.start();
})();
