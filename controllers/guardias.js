/**
 * Created by caev03 on 3/27/16.
 */
module.exports = function (app) {

    var Guardia = require("../models/guardia.js");

    findAllGuardias = function (req, res) {
        Guardia.find(function (err, guardia) {
            if (err) res.send(500, err.message);

            console.log('GET /guardias')
            res.status(200).jsonp(guardia);
        });
    };

    findById = function (req, res) {
        Guardia.findById(req.params.id, function (err, guardia) {
            if (err) return res.send(500, err.message);

            console.log('GET /guardias/' + req.params.id);
            res.status(200).jsonp(guardia);
        });
    };

    addGuardia = function (req, res) {
        console.log('POST');
        console.log(req.body);

        var guardia = new Guardia({
            guardiaId: req.body.guardiaId,
            cedula:    req.body.cedula,
            nombre:    req.body.nombre,
            numCelular:req.body.numCelular
        });

        guardia.save(function (err, guardia) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(guardia);
        });
    };

    updateGuardia = function (req, res) {
        guardia.findById(req.params.id, function (err, guardia) {
            guardia.guardiaId= req.body.guardiaId;
            guardia.cedula=    req.body.cedula;
            guardia.nombre=    req.body.nombre;
            guardia.numCelular=req.body.numCelular;

            guardia.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(guardia);
            });
        });
    };

    deleteGuardia = function (req, res) {
        guardia.findById(req.params.id, function (err, guardia) {
            guardia.remove(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            })
        });
    };

//Link routes and functions
    app.get('/guardias', findAllGuardias);
    app.get('/guardias/:id', findById);
    app.post('/guardias', addGuardia);
    app.put('/guardias/:id', updateGuardia);
    app.delete('/guardias/:id', deleteGuardia);
}
