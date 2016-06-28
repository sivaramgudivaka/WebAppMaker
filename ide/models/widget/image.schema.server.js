var mongoose = require("mongoose");

module.exports = function () {

    var ImageSchema = mongoose.Schema({
        url   : String,
        width : String,
        height: String
        
    });

    return ImageSchema;
};