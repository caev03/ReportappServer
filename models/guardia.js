/**
 * Created by cami on 4/5/16.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var guardiaSchema = new Schema({
    guardiaId: {type:String},
    cedula:    { type: String },
    nombre: {type: String},
    numCelular: {type: Number}
});

module.exports = mongoose.model('Guardia', guardiaSchema);