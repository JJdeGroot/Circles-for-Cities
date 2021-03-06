/** HOSTING */
var querystring = require('querystring');
var express = require('express'); // Express
var app = express();
app.use(express.static(__dirname + '/'));

/** EMAIL */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sustainabilitycircles2015@gmail.com',
        pass: '$ustainable'
    }
});

/** Renders the homepage */
app.get('/', function (req, res) {
    res.render('index.html');
});

/** Requires: receiver as string, html as string, image as base64 datastring */
app.post('/mail', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    var body = '';
    
    // Read data
    req.on('data', function(chunk) {
        console.log("Received body data.");
        body += chunk.toString();
    });
    
    // use data
    req.on('end', function() {
        // Parse data
        var parameters = querystring.parse(body);
        console.log("Parameters successfully parsed!");
        //console.log(parameters);
        
        if(parameters.receiver !== undefined && parameters.html !== undefined && parameters.image !== undefined) {
            // Attachments
            var image = {filename: 'Circle of Sustainability', path: parameters.image};
            var webpage =  {filename: 'report.html', content: "<html><body><div>"+parameters.html+"</div><div><img src='"+parameters.image+"'/></div></body></html>"};
            
            // Setup e-mail data
            var mailOptions = {
                from: 'Circles of Sustainability <sustainabilitycircles2015@gmail.com>', // Sender address
                to: parameters.receiver, // The receiver
                subject: 'Your Circles of Sustainability report', // Subject
                text: parameters.html, // Plaintext body
                html: parameters.html, // HTML body
                attachments: [image, webpage] // Image & Webpage
            };

            // Send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log('Error sending email :(');
                    console.log(error);
                    res.sendStatus(400);
                }else{
                    console.log('Message sent successfully :)');
                    res.sendStatus(200);
                }
            });
        }else{
            console.log("Missing required parameters");
            res.sendStatus(400);
        }
    });
    
});

/** Accessable at port 8080 */
app.listen(process.env.PORT || 8080);
console.log('Your app is now running at: http://127.0.0.1:8080/');