/**
 * Created by caev03 on 3/27/16.
 */
var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');
    bodyParser = require("body-parser");
    methodOverride = require("method-override");
    multipart = require('connect-multiparty');
    multipartMiddleware = multipart({ uploadDir: 'C:/Users/Usuario Autorizado/Documents/ReportAppFiles'});
    require("./models/reporte.js");
    require("./models/implemento.js");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(methodOverride());


app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.post('/upload', multipartMiddleware, function(req, res){
	console.log("/POST-upload");
	//var file = req.files.file;
	//console.log(file.name);
	//console.log(file.type);
	res.status(200).send('OK');
});

reportes = require("./controllers/reportes")(app);
implementos = require("./controllers/implementos")(app);
guardias = require("./controllers/guardias")(app);
mongoose.connect('mongodb://localhost/');

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});


