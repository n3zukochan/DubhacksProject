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
});