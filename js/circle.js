// Declare global variable
  var assessment, canvas, numCircles = 9;

$(document).ready(function() {
	// Get the canvas
   canvas = $("#assessmentCanvas")[0];
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
	 assessment = new CoS.Assessment(ctx, { 
	 	width: 600, 
	 	height: 600,
	 	values:  values,
	 	numCircles: numCircles,
	 	drawText: true,
	 	axisLength: 1.2,
	 	lineWidth: 1,
	 	radiusProportion: 0.75,
	 	font: "bold 20px sans-serif",
	 	rotation: 0
	 });

   assessment.drawAssessmentCircle();

    // Create the slider
    var currentVal = Math.ceil(numCircles / 2);
   $('#assessSlider').slider({ 
   		min: 1, max: 12, value: Math.ceil(numCircles / 2), step: 1,
   		slide: function(event, ui) {
    	$("#slider-value").html(assessment.getRatingText(ui.value - 1));
		}
   	});

   // Add colors to slider
   var colours = $(".scale-item");
   for (var i = 0; i < colours.length; i++) {
   	var colourDiv = colours[i];
   	$(colourDiv).css({'background-color': assessment.getRatingColor(i)});
   }

   // Event handling
   addHandler();
});


function addHandler() {
    canvas.addEventListener('click', function(e){
        var point = determinePoint(e);
        assessment.findSegment(point.x, point.y, updateSegment);
    });
    canvas.addEventListener('mousemove', function(e){
        var point = determinePoint(e);
        assessment.findSegment(point.x, point.y, showSubdomain);
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
    $('#assessDomain').html(domainName);
    $('#assessSubdomain').html(subdomainName);
     $('#assessmentDialog').dialog({
         autoOpen: false,
         buttons: {
             "OK": function() {
                 var val = ($('#assessSlider').slider( "option", "value" ));
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
  $('#assessSlider').slider({ min: 1, max: numCircles + 1, value: oldValue, step: 1 });
    $("#slider-value").html(assessment.getRatingText(oldValue - 1));

    $('#assessmentDialog').dialog('open');
}

var drawSegment = function (domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
   // saveAssessment(extent);
   assessment.updateCircleSegment(domainId, subdomainId, newValue);
}

var showSubdomain = function (domainId, domainName, subdomainId, subdomainName, oldValue, newValue) {
	$("#tooltip").html(domainName + ": " + subdomainName);
}