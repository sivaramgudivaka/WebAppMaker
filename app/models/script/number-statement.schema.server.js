var mongoose = require("mongoose");

module.exports = function() {

    var NumberStatementSchema = mongoose.Schema({
        operationType : {type : String, enum : ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"]},
        input1        : String,
        input2        : String,
        output        : String
    });

    return NumberStatementSchema;
};