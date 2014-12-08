/** Generates and shows the result */
function _generate() {
	var map = "<div>Map<br/>blablabla<br/>blablabla</div>";
	var circle = "<div>Circle<br/>blablabla<br/>blablabla</div>";

	$("#code").text(map+circle);
	$("#result").show("slow");
}

/** Closes the result div */
function _close() {
	$("#result").hide("slow");
}