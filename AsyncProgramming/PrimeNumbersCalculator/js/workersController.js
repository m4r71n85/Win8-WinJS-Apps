/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

var WorkersController = WinJS.Class.define(function (amountOfWorkers, pathToWorker, labelFreeWorkers, submitButtonId) {
	this.freeWorkers = new Array(amountOfWorkers);
	this._workers = new Array(amountOfWorkers);
	this._labelFreeWorkers = document.getElementById(labelFreeWorkers);
	this._submitButton = document.getElementById(submitButtonId);
	this._amountOfFreeWorkers = amountOfWorkers;

	for (var i = 0; i < amountOfWorkers; i++) {
		this.freeWorkers[i] = true;
		this._workers[i] = new Worker(pathToWorker);
		var self = this;
		this._workers[i].onmessage = function (event) {
			var data = event.data;
			var element = "#primes-col-" + data.workerIndex;
			var workersDiv = document.querySelector(element);
			workersDiv.innerText = data.primes.join(", ");
			self._freeWorker(data.workerIndex);
		}
	}
}, {
	amountOfFreeWorkers: {
		get: function () { return this._amountOfFreeWorkers; },
	},
	setLabel: function () {
		this._labelFreeWorkers.innerHTML = this._amountOfFreeWorkers;
		WinJS.UI.Animation.fadeIn(this._labelFreeWorkers);
	},
	getFreeWorkerIndex: function () {
		console.log(this._amountOfFreeWorkers);
		console.log(this.freeWorkers.length);
		var index = -1;
		for (var i = 0; i < this.freeWorkers.length; i++) {
			if (this.freeWorkers[i] == true && index == -1) {
				index = i;
			}
		}
		return index;
	},
	useWorker: function (workerIndex, fromNumber, toNumber) {
		this._amountOfFreeWorkers--;
		this.freeWorkers[workerIndex] = false;
		this._workers[workerIndex].postMessage({ fromNumber: fromNumber, toNumber: toNumber, workerIndex: workerIndex });
	},
	_freeWorker: function (workerIndex) {
		this._amountOfFreeWorkers++;
		this.freeWorkers[workerIndex] = true;
		this.setLabel();
		this._submitButton.disabled = false;
	}
});