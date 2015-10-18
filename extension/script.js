
$(document).ready(function() {
	$("#titlePlayButton").click(function() {
		if ($("#titlePlayPic").hasClass("play")) {
			$("#titlePlayPic").replaceWith("<img src=\"pause.png\" alt=\"play\" id=\"titlePlayPic\">");
		} else {
			$("#titlePlayPic").replaceWith("<img src=\"play.png\" alt=\"play\" class=\"play\" id=\"titlePlayPic\">");
		}
	});
	
	$("#articlePlayButton").click(function() {
		if ($("#articlePlayPic").hasClass("play")) {
			$("#articlePlayPic").replaceWith("<img src=\"pause.png\" alt=\"play\" id=\"articlePlayPic\">");
		} else {
			$("#articlePlayPic").replaceWith("<img src=\"play.png\" alt=\"play\" class=\"play\" id=\"articlePlayPic\">");
		}
	});
	
	$("#titleMic").click(function() {
		document.getElementById("titleMic").disabled = true;
	});
	
	$("#articleMic").click(function() {
		document.getElementById("articleMic").disabled = true;
	});
	
	$("#titleStop").click(function() {
		document.getElementById("titleMic").disabled = false;
	});
	
	$("#articleStop").click(function() {
		document.getElementById("articleMic").disabled = false;
	});
});