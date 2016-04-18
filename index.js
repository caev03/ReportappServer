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

app.get('/downloado/:id/:num', function(req, res) {
    //var path = '/home/juanjorogo/ReportAppFiles';
    var path = 'C:/Users/Usuario Autorizado/Documents/ReportAppFiles';

    files = [];
    var files = fileSystem.readdirSync(path);
    for (var i in files){
        var name = path + '/' + files[i];
        if (fileSystem.statSync(name).isDirectory()){
            //do nothing dis code sucks lel
        } else {
            var nom = req.params.id;
            if(name.indexOf(nom)>-1){
                files.push(name);
            }

        }
    }

    for(var j in files){
        var nameo = files[j];
        var  arr;
        if(nameo.indexOf('ReporAppFiles')<0){
           files.splice(j,1);
           j--;
        }
    }
    
    //File send
    var numeron = parseInt(req.params.num);

    var stat = fileSystem.statSync(path+'/'+files[numeron-1].replace(/\\/g, '/'));

    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(path+'/'+files[numeron-1].replace(/\\/g, '/'));
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


