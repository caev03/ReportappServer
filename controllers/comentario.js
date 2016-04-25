/**
 * Created by j
 */
module.exports = function (app) {

    var Comentario = require("../models/comentario.js");

    findAllComments = function (req, res) {
        Comentario.find(function (err, comentario) {
            if (err) res.send(500, err.message);

            console.log('GET /comentarios')
            res.status(200).jsonp(comentario);
        });
    };
    //Findbyone

    findById = function (req, res) {
        Comentario.findById(req.params.id, function (err, guardia) {
            if (err) return res.send(500, err.message);

            console.log('GET /guardias/' + req.params.id);
            res.status(200).jsonp(guardia);
        });
    };

    addComment = function (req, res) {
        console.log('POST /comentario');
        console.log(req.body);

        var comentario = new Comentario({
            idOrigen: req.body.idOrigen,
            idDestino:    req.body.idDestino,
            comentario:    req.body.comentario
        });

        comentario.save(function (err, comentario) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(comentario);
        });
    };

//Link routes and functions
    app.get('/comentarios', findAllComments);
    app.get('/comentarios/:id', findById);
    app.post('/comentarios', addComment);

}
