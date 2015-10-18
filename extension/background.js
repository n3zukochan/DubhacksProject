chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create("recorder.html", {
		"outerBounds": {
		"width": 550,
		"height": 250
		}
	});
});
