/**
 * Created by caev03 on 3/27/16.
 */
module.exports = function (app) {

    var Reporte = require("../models/reporte.js");

    addPicture = function(){
            reporte.findById(req.params.id, function (err, reporte) {
            //Necesita cambios para que sea un archivo.
            reporte.title = req.body.title;

            reporte.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(reporte);
            });
        });
    };
    
    findAllReportes = function (req, res) {
        Reporte.find(function (err, reporte) {
            if (err) res.send(500, err.message);

            console.log('GET /reportes')
            res.status(200).jsonp(reporte);
        });
    };


    getAllTags = function (req, res) {
        query = {};
        Reporte.find(query, 'identificador',function (err, reporte) {
            if (err) res.send(500, err.message);

            console.log('GET /reportesIdentificador')
            res.status(200).jsonp(reporte);
        });
    };

    findById = function (req, res) {
        query = {'identificador' : req.params.id};
        Reporte.find(query, 'identificador message' function (err, reporte) {
            if (err) return res.send(500, err.message);

            console.log('GET /reportes/' + req.params.id);
            res.status(200).jsonp(reporte);
        });
    };

    addReporte = function (req, res) {
        console.log('POST /reportes addReporte');
        console.log(req.body);

        var reporte = new Reporte({
            id: req.body.id,
            identificador: req.body.identificador,
            message: req.body.message
        });

        reporte.save(function (err, reporte) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(reporte);
        });
    };

    updateReporte = function (req, res) {
        reporte.findById(req.params.id, function (err, reporte) {
            reporte.title = req.body.title;

            reporte.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(reporte);
            });
        });
    };

    deleteReporte = function (req, res) {
        reporte.findById(req.params.id, function (err, reporte) {
            reporte.remove(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            })
        });
    };

//Link routes and functions
    app.get('/reportes', findAllReportes);
    app.get('/reportes/:id', findById);
    app.post('/reportes', addReporte);
    app.put('/reportes/:id', updateReporte);
    app.delete('/reportes/:id', deleteReporte);
    //test
    app.get('/reportesList', getAllTags);
    app.post('/reportes/:id/add', addPicture);
}
