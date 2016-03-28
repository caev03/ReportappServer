/**
 * Created by caev03 on 3/27/16.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var reporteSchema = new Schema({
    message:    { type: String }
});

module.exports = mongoose.model('Reporte', reporteSchema);
