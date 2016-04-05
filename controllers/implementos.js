/**
 * Created by cami on 4/4/16.
 */
module.exports = function (app) {

    var Implemento = require("../models/implemento.js");
    findAllImplementos = function (req, res) {
        Implemento.find(function (err, implemento) {
            if (err) res.send(500, err.message);

            console.log('GET /implementos')
            res.status(200).jsonp(implemento);
        });
    };

//GET - Return a TVShow with specified ID
    findById = function (req, res) {
        Implemento.findById(req.params.id, function (err, implemento) {
            if (err) return res.send(500, err.message);

            console.log('GET /implementos/' + req.params.id);
            res.status(200).jsonp(implemento);
        });
    };

    addImplemento = function (req, res) {
        console.log('POST');
        console.log(req.body);

        var implemento = new Implemento({
            barcodeId: req.body.barcodeId,
            tipoImplemento: req.body.tipoImplemento,
            estado: req.body.estado,
            guardiaId: req.body.guardiaId,
            descripcion: req.body.descripcion
        });

        implemento.save(function (err, implemento) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(implemento);
        });
    };

//PUT - Update a register already exists
    updateImplemento = function (req, res) {
        implemento.findById(req.params.id, function (err, implemento) {
            implemento.barcodeId = req.body.barcodeId;
            implemento.tipoImplemento = req.body.tipoImplemento;
            implemento.estado = req.body.estado;
            implemento.guardiaId = req.body.guardiaId;
            implemento.descripcion = req.body.descripcion;

            implemento.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(implemento);
            });
        });
    };

    deleteImplemento = function (req, res) {
        implemento.findById(req.params.id, function (err, implemento) {
            implemento.remove(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            })
        });
    };

//Link routes and functions
    app.get('/implementos', findAllImplementos);
    app.get('/implementos/:id', findById);
    app.post('/implementos', addImplemento);
    app.put('/implementos/:id', updateImplemento);
    app.delete('/implementos/:id', deleteImplemento);
}