var mongoose = require("mongoose");

module.exports = function() {

    var NumberStatementSchema = mongoose.Schema({
        operationType : {type : String, enum : ["+", "-", "x", "/","log","power","square root","cube root","%","sin","cos",
        "tan","cot","cosec", "cosine","cube"]},
        input1        : String,
        input2        : String,
        output        : String
    });

    return NumberStatementSchema;
};

