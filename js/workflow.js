$(document).ready(function() {
    
    // Email form
    $('#form').on('submit', function(e) {
        e.preventDefault();
        
        // Check receiver email address
        var receiver = $("#receiver").val();
        console.log("Receiver : " + receiver);
        if(receiver.length >= 3 && /\S+@\S+\.\S+/.test(receiver)) {
            $('#generate').attr('disabled', 'disabled').addClass('disabled').val("Sending report...");

            // Generate HTML
            var info = $("#rightcol").html();
            var html = "<html><body><div>"+info+"</div></body></html>";
            var imageURL = document.getElementById('circleCanvas').toDataURL("image/png");
            
            // Perform request
            var request = $.ajax({
              url: "mail",
              type: "POST",
              data: { receiver: receiver, html: html, image: imageURL },
            }).done(function( msg ) {
                alert("Email has beent sent succesfully!");
                $('#generate').removeAttr('disabled').removeClass('disabled').val("Send report");
            }).fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
                $('#generate').removeAttr('disabled').removeClass('disabled').val("Send report");
            });
        }else{
            // Receiver email check returned false.
            alert("Invalid e-mail address");
        }
    });

});