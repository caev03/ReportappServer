/**
 * Created by cami on 4/25/16.
 */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var estudianteSchema = new Schema({
    estudianteId: {type:String},
    nombre:    { type: String },
    correo: {type: String},
    contrasena: {type: String},
    fechaNacimiento: {type: String},
    preferencial: {type: Boolean}
});

module.exports = mongoose.model('Estudiante', estudianteSchema);

