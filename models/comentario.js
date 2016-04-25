/**
 * Created by j
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var commentSchema = new Schema({
    idOrigen: {type:String},
    idDestino:    { type: String },
    comentario: {type: String}
});

module.exports = mongoose.model('Comentario', commentSchema);