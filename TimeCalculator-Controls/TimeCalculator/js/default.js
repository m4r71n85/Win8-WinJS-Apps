﻿/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;

    app.onactivated = function (args) {
    	args.setPromise(WinJS.UI.processAll());
    	// Initialize variables.
    	var calculateButton = document.getElementById("btn-calculate");
    	var toggleSwitch = document.getElementById("time-toggle");
    	var timePickers = document.getElementsByClassName("time-picker");
    	var header = document.getElementById("picker-header");
    	var outputContainer = document.getElementById("output-container");
    	var menu = document.getElementById("menu-id").winControl;
    	var menuDays = document.getElementById("days");
    	var menuHours = document.getElementById("hours");
    	var menuBoth = document.getElementById("both");
		var calcTimeSwitcher = null;
    	var intervalMode = null;
    	var fromDate = null;
    	var toDate = null;
    	var fromTime = null;
    	var toTime = null;

    	// Initialize event listeners.
    	calculateButton.addEventListener("click", function () {
    		menu.show();
    	}, false);

    	menuDays.addEventListener("click", function () {
    		prepareCalculation("days");
    	});

    	menuHours.addEventListener("click", function () {
    		prepareCalculation("hours");
    	});

    	menuBoth.addEventListener("click", function () {
    		prepareCalculation("both");
    	});

		toggleSwitch.addEventListener("change", function () {
			calcTimeSwitcher = toggleSwitch.winControl.checked;
			var display = "none";
			var headerText = "Date";
			var containerHeight = "40%";
			if (calcTimeSwitcher == true) {
				headerText = "Date/time";
				display = "block";
				containerHeight = "27%";
			}
			header.innerText = headerText;
			outputContainer.style.height = containerHeight;
			for (var i = 0; i < timePickers.length; i++) {
				timePickers[i].style.display = display;
			}
			outputContainer.scrollTop = outputContainer.scrollHeight;
		}, false);

    	// Initialize functions listeners.
		function updateIntervalValues() {
			fromDate = document.getElementById("date-from").winControl.current;
			toDate = document.getElementById("date-to").winControl.current;
			fromTime = document.getElementById("time-from").winControl.current; // Note that the date value is always July 15, 2011.
			toTime = document.getElementById("time-to").winControl.current;	// Note that the date value is always July 15, 2011.
		}

		function prepareCalculation(intervalMode) {
			updateIntervalValues();
			var dateTime = {};
			dateTime.from = fromDate;
			dateTime.to = toDate;
			if (calcTimeSwitcher == true) {
				dateTime = mergeDateAndTimePickerValues(dateTime);
			}
			var intervals = calculateInterval(dateTime.from, dateTime.to)
			renderResult(intervalMode, intervals);
		};

		function calculateInterval(fromDateTime, toDateTime) {
			var result = {};
			var interval = null;
			// Set the unit values in milliseconds.
			var msecPerMinute = 1000 * 60;
			var msecPerHour = msecPerMinute * 60;
			var msecPerDay = msecPerHour * 24;
			// Get the difference in milliseconds.
			interval = fromDateTime.getTime() - toDateTime.getTime();
			interval = Math.abs(interval);
			// Calculate how many days the interval contains.
			result.days = Math.floor(interval / msecPerDay);
			// Calculate the hours.
			result.hours = Math.floor(interval / msecPerHour);
			return result;
		}

		function renderResult(intervalMode, intervals) {
			
			var fromDateStr = fromDate.getDate() + "/" + fromDate.getMonth() + "/" + fromDate.getFullYear()
			var toDateStr = toDate.getDate() + "/" + toDate.getMonth() + "/" + toDate.getFullYear();
			var fromTimeStr = " "+fromTime.getHours() + ":" + fromTime.getMinutes();
			var toTimeStr = " "+toTime.getHours() + ":" + toTime.getMinutes();
			var paragraph = document.createElement("p");
			var content = "";
			calcTimeSwitcher = toggleSwitch.winControl.checked
			if (calcTimeSwitcher == false) {
				toTimeStr = "";
				fromTimeStr = "";
			}
			var toDateTime = toDateStr + toTimeStr
			var fromDateTime = fromDateStr + fromTimeStr
			content = "From [" + fromDateTime + "] to [" + toDateTime + "] is: " + intervals.days + " days.";
			switch (intervalMode) {
				case "hours":
					content = "From [" + fromDateTime + "] to [" + toDateTime + "] is: " + intervals.hours + " hours.";
					break;
				case "both":
					
					content += "<br/> From [" + fromDateTime + "] to [" + toDateTime + "] is: " + intervals.hours + " hours.";
					break;
			}
			paragraph.innerHTML = content;
			outputContainer.appendChild(paragraph);
			outputContainer.scrollTop = outputContainer.scrollHeight;
		}

		function mergeDateAndTimePickerValues(dateTime) {
			dateTime.from.setHours(fromTime.getHours());
			dateTime.from.setMinutes(fromTime.getMinutes());
			dateTime.to.setHours(toTime.getHours());
			dateTime.to.setMinutes(toTime.getMinutes());
			return dateTime;
		}
    };

    app.start();
})();
