// Declare global variable
var circle, canvas, numCircles = 9;

$(document).ready(function() {
	// Get the canvas
   canvas = $("#circleCanvas")[0];
   var ctx = canvas.getContext('2d');

	 // Setup random data
	 var values = new Array();
    for (var i = 0; i < 4; i++) {
        var domainValues = new Array();
        for (var j = 0; j < 7; j++) {
        	var extent = Math.ceil(Math.random() * numCircles);
        	domainValues.push(extent);
        }
        values.push(domainValues);
    }

   // Create the Assessment
	 circle = new CoS.Circle(ctx, { 
    domains: CoS.Engagement,
	 	width: 400, 
	 	height: 400,
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
   $('#circleSlider').slider({ 
   		min: 1, max: 12, value: Math.ceil(numCircles / 2), step: 1,
   		slide: function(event, ui) {
    	$("#slider-value").html(circle.getRatingText(ui.value - 1));
		}
   	});

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
        circle.findSegment(point.x, point.y, showSubdomain);
    });
}

var determinePoint = function(e) {
		e = $.event.fix(e || window.event);
    return {x: e.offsetX, y: e.offsetY};
}

var updateSegment = function(domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
    if ($('#showDialog').is(':checked')) {
        showAssessmentDialog(domainId, domainName, subdomainId, subdomainName, oldValue, newValue);
    }
    else {
        drawSegment(domainId, domainName, subdomainId, subdomainName, oldValue, newValue);
    }
}

var showAssessmentDialog = function (domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
    $('#circleDomain').html(domainName);
    $('#circleSubdomain').html(subdomainName);
     $('#circleDialog').dialog({
         autoOpen: false,
         buttons: {
             "OK": function() {
                 var val = ($('#circleSlider').slider( "option", "value" ));
                 if (val > 9)
                 		val = 9;
                 $(this).dialog('close');
                 drawSegment(domainId, domainName, subdomainId, subdomainName, oldValue, val);
             },
             "Cancel": function() {
                 $(this).dialog('close');
             }
         }
     });
  $('#circleSlider').slider({ min: 1, max: numCircles + 1, value: oldValue, step: 1 });
    $("#slider-value").html(circle.getRatingText(oldValue - 1));

    $('#circleDialog').dialog('open');
}

var drawSegment = function (domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
   // saveAssessment(extent);
   circle.updateCircleSegment(domainId, subdomainId, newValue);
}

var showSubdomain = function (domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
	$("#tooltip").html(domainName + ": " + subdomainName);
}