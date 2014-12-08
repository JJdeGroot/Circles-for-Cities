/** Generates and shows the result */
function _generate() {
	var html = $("#rightcol").html();

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