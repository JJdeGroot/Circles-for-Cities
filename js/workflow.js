/** Generates and shows the result */
function _generate() {
	// Construct URL
	var receivers = "sustainabilitycircles2015@gmail.com";
	var html = $("#rightcol").html();
	var url = "mail?receivers=" + encodeURI(receivers) + "&html=" + encodeURI(html);
	console.log("POST URL: " + url);

	// Post the mail
	$.post(url, function() {
		alert( "success" );
	}).fail(function() {
		alert("failed");
	});


	// Show code
	$("#code").text(html);
	$("html, body").animate({ scrollTop: $(document).height() });
	$("#result").show(500);

	// Canvas to Image
	var imageURL = document.getElementById('circleCanvas').toDataURL("image/png");
	console.log(imageURL);
	$("#result").append('<a href="'+imageURL+'" target="_blank">Download circle (right click --> save as)</a>');

}

/** Closes the result div */
function _close() {
	$("#result").hide(500);
}