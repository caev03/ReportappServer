/**
 * Created by cami on 4/25/16.
 */
/**
 * Created by caev03 on 3/27/16.
 */
module.exports = function (app) {

    var Estudiante = require("../models/estudiante.js");

    findAllEstudiantes = function (req, res) {
        Estudiante.find(function (err, estudiante) {
            if (err) res.send(500, err.message);

            console.log('GET /estudiantes')
            res.status(200).jsonp(estudiante);
        });
    };

    findById = function (req, res) {
        Estudiante.findById(req.params.id, function (err, estudiante) {
            if (err) return res.send(500, err.message);

            console.log('GET /estudiantes/' + req.params.id);
            res.status(200).jsonp(estudiante);
        });
    };

    addEstudiante = function (req, res) {
        console.log('POST');
        console.log(req.body);

        var estudiante = new Estudiante({
            estudianteId: req.body.estudianteId,
            nombre:    req.body.nombre,
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            fechaNacimiento: req.body.fechaNacimiento,
            preferencial: req.body.preferencial
        });

        estudiante.save(function (err, estudiante) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(estudiante);
        });
    };

    updateEstudiante = function (req, res) {
        estudiante.findById(req.params.id, function (err, estudiante) {
            estudiante.estudianteId= req.body.estudianteId;
            estudiante.cedula=    req.body.cedula;
            estudiante.nombre=    req.body.nombre;
            estudiante.numCelular=req.body.numCelular;

            estudiante.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(estudiante);
            });
        });
    };

    deleteEstudiante = function (req, res) {
        estudiante.findById(req.params.id, function (err, estudiante) {
            estudiante.remove(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send();
            })
        });
    };

//Link routes and functions
    app.get('/estudiantes', findAllEstudiantes);
    app.get('/estudiantes/:id', findById);
    app.post('/estudiantes', addEstudiante);
    app.put('/estudiantes/:id', updateEstudiante);
    app.delete('/estudiantes/:id', deleteEstudiante);
}
