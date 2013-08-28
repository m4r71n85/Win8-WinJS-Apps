// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
	
    app.onactivated = function (args) {
    	args.setPromise(WinJS.UI.processAll());
        if (args.detail.kind === activation.ActivationKind.launch) {
        	var addVerseButton = document.getElementById("add-verse");
        	var poem = document.getElementById("poem");
        	var inputHeader = document.getElementById("poem-header");
        	var poemHeader = document.getElementsByTagName("h2")[0];
        	var lines = document.getElementsByClassName("verse-line");
        	var cmdNew = document.getElementById("cmdNew");
        	var cmdOpen = document.getElementById("cmdOpen");
        	var cmdSave = document.getElementById("cmdSave");
        	var confirmFlyout = document.getElementById("confirm-cmdNew").winControl;
        	var discardConfirmation = document.getElementById("discard");
        	var proceedConfirmation = document.getElementById("proceed");
			
			//Open Poem Events
        	cmdOpen.addEventListener("click", function () {
        		var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        		openPicker.fileTypeFilter.append(".poem");
        		openPicker.pickSingleFileAsync().then(function (file) {
        			clearPage(poem, confirmFlyout, lines, inputHeader);
        			Windows.Storage.FileIO.readTextAsync(file).then(function (content) {
        				poem.innerText = content;
        			});
        		});
        	});

        	//Save Poem Events
        	cmdSave.addEventListener("click", function () {
        		var textToSave = poem.innerText;
        		var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        		savePicker.fileTypeChoices.insert("Poem files", [".poem"]);
        		savePicker.suggestedFileName = "New Poem File";
        		savePicker.pickSaveFileAsync().then(function (file) {
        			Windows.Storage.FileIO.writeTextAsync(file, textToSave);
        		});
        	});

        	//New Poem Events
        	//Start new poem
        	cmdNew.addEventListener("click", function () {
        		confirmFlyout.show(cmdNew);
        	});
        	//new poems confirmation - discard
        	discardConfirmation.addEventListener("click", function () {
        		confirmFlyout.hide();
        	});
        	//new poems confirmation - proceed
        	proceedConfirmation.addEventListener("click", function () {
        		clearPage(poem, confirmFlyout, lines, inputHeader);
        	});

			//Business Logic
        	//Submit and add verse to poem
        	addVerseButton.addEventListener("click", function () {
        		var verse = document.createElement("div");
        		verse.className = "verse";

        		for (var i = 0; i < lines.length; i++) {
        			var line = document.createElement("div");
        			line.className = "line";
        			line.innerText = lines[i].value
					verse.appendChild(line);
        		}
        		poem.appendChild(verse);
        	}, false);
        	inputHeader.addEventListener("change", function () {
        		poemHeader.innerText = this.value;
        	}, false);

			//Enable/Disable "Submit" button
        	for (var i = 0; i < lines.length; i++) {
        		lines[i].addEventListener("change", function () {
        			for (var j = 0; j < lines.length; j++) {
        				if (lines[j].value == "") {
        					addVerseButton.disabled = true;
        					return;
        				}
        			}
        			addVerseButton.disabled = false;
        		});
        	}
        }

        function clearPage(poem, confirmFlyout, lines, inputHeader) {
        	for (var i = 0; i < lines.length; i++) {
        		lines[i].value = "";
        	}
        	inputHeader.value = "";
        	poem.innerHTML = "";
        	var header = document.createElement("h2");
        	header.innerText = "New poem";
        	poem.appendChild(header);
        	confirmFlyout.hide();
        }
    };

    app.start();
})();
