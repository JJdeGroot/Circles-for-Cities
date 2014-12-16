$(document).ready(function() {
    
    // Email form
    $('#form').on('submit', function(e) {
        e.preventDefault();
        
        // Receiver
        var receiver = $("#receiver").val();
        console.log("Receiver : " + receiver);
        if(receiver.length >= 3) {
            // Get HTML
            $('#generate').attr('disabled', 'disabled').addClass('disabled').val("Sending report...");
            var html = $("#rightcol").html();
            
            // Request
            var request = $.ajax({
              url: "mail",
              type: "POST",
              data: { receiver: receiver, html: html }
            }).done(function( msg ) {
                alert("Email has beent sent succesfully!");
                $('#generate').removeAttr('disabled').removeClass('disabled').val("Send report");
            }).fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
                $('#generate').removeAttr('disabled').removeClass('disabled').val("Send report");
            });
  
            // Canvas to Image
            var imageURL = document.getElementById('circleCanvas').toDataURL("image/png");
            console.log(imageURL);
            $("#report").append('<a href="'+imageURL+'" target="_blank">Download circle (right click --> save as)</a>');
        }
    });

});

// Extension to JQuery for URL param extraction - taken from: http://www.sitepoint.com/url-parameters-jquery/
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if ( results == null ) 
       return undefined;
    else 
       return results[1] || 0;
}
