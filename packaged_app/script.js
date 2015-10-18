/*


*/

// alert("Hello");

$(document).ready(function() {
	$("#articlePlayButton").click(function() {
		if ($("#articlePlayIcon").hasClass("fa-play")) {
			$("#articlePlayIcon").removeClass("fa-play");
			$("#articlePlayIcon").addClass("fa-pause");
		} else {
			$("#articlePlayIcon").removeClass("fa-pause");
			$("#articlePlayIcon").addClass("fa-play");
		}
		console.log("Hello.");
	});
	
	$("#titlePlayButton").click(function() {
		if ($("#titlePlayIcon").hasClass("fa-play")) {
			$("#titlePlayIcon").removeClass("fa-play");
			$("#titlePlayIcon").addClass("fa-pause");
		} else {
			$("#titlePlayIcon").removeClass("fa-pause");
			$("#titlePlayIcon").addClass("fa-play");
		}
		console.log("Hello.");
	});
	
	function getCurrentTabUrl(callback) {
		// Query filter to be passed to chrome.tabs.query - see
		// https://developer.chrome.com/extensions/tabs#method-query
		var queryInfo = {
			active: true,
			currentWindow: true
		};

		chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
			var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
			var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
			console.assert(typeof url == 'string', 'tab.url should be a string');

			console.log(url);
			
			callback(url);
		});

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
	}
});