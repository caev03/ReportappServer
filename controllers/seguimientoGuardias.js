/**
 * Created by caev0 on 12/05/2016.
 */
module.exports = function (app) {

    var SeguimientoGuardia = require("../models/seguimientoGuardia.js");

    findAllOcurrencias = function (req, res) {
        SeguimientoGuardia.find(function (err, seguimientoGuardia) {
            if (err) res.send(500, err.message);

            console.log('GET /implementos')
            res.status(200).jsonp(seguimientoGuardia);
        });
    };
    addOcurrencia = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var today = new Date();
        var todayMilis = today.getTime();
        var seguimientoGuardia = new SeguimientoGuardia({
            idGuardia: req.body.idGuardia,
            macAddress: req.body.macAddress,
            fechaOcurrencia: todayMilis,
            ultimaOcurrencia: todayMilis
        });

        seguimientoGuardia.save(function (err, seguimientoGuardia) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(seguimientoGuardia);
        });
    };

    findOcurrencia = function (req, res) {
        var params = req.params.parameters.split("-");
        console.log(req.params.parameters);
        query = {'macAddress' : params[0], "idGuardia": params[1] };
        SeguimientoGuardia.find(query, function (err, seguimientoGuardia) {
            if (err) res.send(500, err.message);
            console.log('GET /implementos');

            res.status(200).jsonp(seguimientoGuardia);
        });
    };
    updateSeguimiento = function (req, res)
    {
        var params = req.params.parameters.split("-");
        query = {'macAddress' : params[0], "idGuardia": params[1], "ultimaOcurrencia": params[2]};
        SeguimientoGuardia.find(query, function (err, seguimiento)
        {
            seguimiento[0].ultimaOcurrencia = req.body.ultimaOcurrencia;


            seguimiento[0].save(function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(seguimiento[0]);
            });
        });
    };

    app.get('/segGuar', findAllOcurrencias);
    app.get('/segGuar/:parameters', findOcurrencia);
    app.post('/segGuar', addOcurrencia);
    app.put('/segGuar/:parameters', updateSeguimiento);
}