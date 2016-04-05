/**
 * Created by cami on 4/4/16.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var implementoSchema = new Schema({
    barcodeId:    { type: String },
    tipoImplemento: {type: String},
    estado: {type: Boolean},
    guardiaId: {type:String}
});

module.exports = mongoose.model('Implemento', implementoSchema);