/**
 * Created by caev03 on 3/27/16.
 */
//File: controllers/tvshows.js
module.exports = function (app) {

    var Reporte = require("../models/reporte.js");
//GET - Return all tvshows in the DB
    findAllReportes = function (req, res) {
        Reporte.find(function (err, reporte) {
            if (err) res.send(500, err.message);

            console.log('GET /reportes')
            res.status(200).jsonp(reporte);
        });
    };

//GET - Return a TVShow with specified ID
    findById = function (req, res) {
        Reporte.findById(req.params.id, function (err, reporte) {
            if (err) return res.send(500, err.message);

            console.log('GET /reportes/' + req.params.id);
            res.status(200).jsonp(reportes);
        });
    };

//POST - Insert a new TVShow in the DB
    addReporte = function (req, res) {
        console.log('POST');
        console.log(req.body);

        var reporte = new Reporte({
            message: req.body.title
        });

        reporte.save(function (err, reporte) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(reporte);
        });
    };

//PUT - Update a register already exists
    updateReporte = function (req, res) {
        reporte.findById(req.params.id, function (err, reporte) {
            reporte.title = req.body.title;

            reporte.save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(reporte);
            });
        });
    };

//DELETE - Delete a TVShow with specified ID
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
}
