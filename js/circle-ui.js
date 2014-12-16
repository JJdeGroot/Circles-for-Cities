// Declare global variable
var circle, canvas, numCircles = 9, domains = CoS.Profile, slider, currentSubdomainId, requireSlider = true;

$(document).ready(function() {
	// Get the canvas
   canvas = $("#circleCanvas")[0];
   var ctx = canvas.getContext('2d');

	 // Setup random data
	 var values = new Array();
    for (var i = 0; i < domains.length; i++) {
        var domainValues = new Array();
        for (var j = 0; j < domains[i].subdomains.length; j++) {
        	var extent = Math.ceil(Math.random() * numCircles);
        	domainValues.push(extent);
        }
        values.push(domainValues);
    }

   // Create the Assessment
	 circle = new CoS.Circle(ctx, { 
    domains: domains,
	 	width: 600, 
	 	height: 600,
	 	values:  values,
	 	numCircles: numCircles,
	 	drawText: true,
	 	axisLength: 1.2,
	 	lineWidth: 1,
	 	radiusProportion: 0.75,
	 	font: "bold 10px sans-serif",
	 	rotation: 0
	 });

   circle.drawCircle();

    // Create the slider
    var currentVal = Math.ceil(numCircles / 2);

   $('#circleSlider').slider();

   // Add colors to slider
   var colours = $(".scale-item");
   for (var i = 0; i < colours.length; i++) {
   	var colourDiv = colours[i];
   	$(colourDiv).css({'background-color': circle.getRatingColor(i)});
   }

   // Event handling
   addHandler();
});


function addHandler() {
    canvas.addEventListener('click', function(e){
        var point = determinePoint(e);
        circle.findSegment(point.x, point.y, updateSegment);
    });
    canvas.addEventListener('mousemove', function(e){
        var point = determinePoint(e);
        if (_.isUndefined( currentSubdomainId ) )
          circle.findSegment(point.x, point.y, showSubdomain);
    });
}

var determinePoint = function(e) {
		e = $.event.fix(e || window.event);
    return {x: e.offsetX, y: e.offsetY};
}

var updateSegment = function(domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
    // if ($('#showDialog').is(':checked')) {
    if (requireSlider) {
        currentSubdomainId = subdomainId;
        showSubdomain(domainId, domainName, subdomainId, subdomainName, oldValue, newValue);
    }
    else {
        drawSegment(domainId, domainName, subdomainId, subdomainName, oldValue, newValue);
    }
}

var drawSegment = function (domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
   circle.updateCircleSegment(domainId, subdomainId, newValue);
}

var showSubdomain = function (domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
    $('#circleDomain').html(domainName);
    $('#circleSubdomain').html(subdomainName);
    $('#question').html(domains[domainId].questions[subdomainId]);
    $('#circleSlider').slider({ 
        min: 1, 
        max: numCircles + 1, 
        value: oldValue, 
        step: 1,
        slide: function( event, ui ) {
          if (ui.value > numCircles)
            ui.value = numCircles;
          drawSegment(domainId, domainName, subdomainId, subdomainName, oldValue, ui.value);
          $("#slider-value").html(circle.getRatingText(ui.value - 1));
          currentSubdomainId = undefined;
        }
      });

}