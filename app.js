/** HOSTING */
var express = require('express'); // Express
var app = express();
app.use(express.static(__dirname + '/'));

/** EMAIL */
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sustainabilitycircles2015@gmail.com',
        pass: '$ustainable'
    }
});

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/mail', function (req, res) {
	console.log(req);

    // setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Circles of Sustainability <sustainabilitycircles2015@gmail.com>', // sender address
	    to: req.query.receiver, // The receiver
	    subject: 'Your Circles of Sustainability report', // Subject
	    text: 'Plain text', // Plaintext body
	    html: req.query.html // HTML body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	console.log('Error sending email :(');
	        console.log(error);
	        res.send(error);
	    }else{
	        console.log('Message sent successfully :)');
	        res.send(info);
	    }
	});
});

app.listen(process.env.PORT || 8080);
console.log('Your app is now running at: http://127.0.0.1:8080/');