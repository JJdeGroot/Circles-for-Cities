$(document).ready(function() {
    
    // Email form
    $('#form').on('submit', function(e) {
        e.preventDefault();
        
        // Receiver
        var receiver = $("#receiver").val();
        console.log("Receiver : " + receiver);
        if(receiver.length >= 3) {
            // HTML
            var html = $("#rightcol").html();

            // URL
            var url = "mail?receiver=" + encodeURI(receiver) + "&html=" + encodeURI(html);
            console.log("POST URL: " + url);

            // Post the mail
            $('#generate').attr('disabled', 'disabled').addClass('disabled').val("Sending report...");
            $.post(url, function(data) {
                console.log(data);
                alert( "success" );
                $('#generate').removeAttr('disabled').removeClass('disabled').val("Send report");
            }).fail(function(data) {
                console.log(data);
                alert("failed");
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
