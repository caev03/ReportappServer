/**
 * Created by caev03 on 12/05/2016.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var seguimientoGuardiaSchema = new Schema({
   idGuardia: {type: String},
    macAddress: {type: String},
    fechaOcurrencia: {type: Number},
    ultimaOcurrencia: {type: Number}
});

module.exports = mongoose.model('SeguimientoGuardia', seguimientoGuardiaSchema);

