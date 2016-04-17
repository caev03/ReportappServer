/**
 * Created by caev03 on 3/27/16.
 */
var express  = require("express"),
    app      = express(),
    http     = require("http"),
    path	= require("path"),
    fileSystem = require("fs"),
    server   = http.createServer(app),
    mongoose = require('mongoose');
    bodyParser = require("body-parser");
    methodOverride = require("method-override");
    multipart = require('connect-multiparty');
    multipartMiddleware = multipart({ uploadDir: 'C:/Users/Usuario Autorizado/Documents/ReportAppFiles'});
    require("./models/reporte.js");
    require("./models/implemento.js");
    require("./models/comentario.js");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(methodOverride());


app.get('/', function(req, res) {
    res.send("Dis the server!");
});

app.get('/download', function(req, res) {
	console.log("/GET-image");
	var filePath = path.join('C:/Users/Usuario Autorizado/Documents/ReportAppFiles', 'Lighthouse.jpg');
    var stat = fileSystem.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
    
});

app.post('/upload', multipartMiddleware, function(req, res){
	console.log("/POST-upload");
	//var file = req.files.file;
	res.status(200).send('OK');
});

reportes = require("./controllers/reportes")(app);
implementos = require("./controllers/implementos")(app);
guardias = require("./controllers/guardias")(app);
comentarios = require("./controllers/comentario")(app);
mongoose.connect('mongodb://localhost/');

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});


