// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	WinJS.strictProcessing();

	app.onactivated = function (args) {
		var playlistContainer = document.getElementById("playlist-files");
		var videoPlayer = document.getElementById("video-player");
		var allVideos = [];


		if (args.detail.kind === activation.ActivationKind.launch) {
			args.setPromise(WinJS.UI.processAll());
			WinJS.Utilities.id("add-single-video-file").listen("click", function () {
				var openPicker = Windows.Storage.Pickers.FileOpenPicker();
				openPicker.fileTypeFilter.append(".mp4");
				openPicker.pickSingleFileAsync().then(addFileToPlaylist);
			});
		}

		function addFileToPlaylist(storageFile) {
			var fileUrl = URL.createObjectURL(storageFile);
			storageFile.properties.getVideoPropertiesAsync().then(function (properties) {
				var newEntry = document.createElement("li");
				//Add to playlist
				newEntry.innerHTML = properties.title;
				newEntry.setAttribute("src", fileUrl);
				playlistContainer.appendChild(newEntry);
				playlistContainer.appendChild
				newEntry.addEventListener("click", function () {
					videoPlayer.src = fileUrl;
					var playing = document.getElementsByClassName("playing")
					if (playing.length>0) {
						playing[0].className = "";
					}
					this.className = "playing";
				});
				allVideos.push(fileUrl);

				videoPlayer.onended = function () {
					var currentSong = videoPlayer.src;
					var videoId = allVideos.indexOf(currentSong)+1;
					if (videoId < allVideos.length) {
						videoPlayer.src = allVideos[videoId];
						colorItem(videoId)
					}
				}

				function colorItem(order) {
					document.getElementsByClassName("playing")[0].className = "";
					var videoItems = document.getElementsByTagName("li");
					videoItems[order].className = "playing";
				}
			});
		};
	};

	app.start();
})();