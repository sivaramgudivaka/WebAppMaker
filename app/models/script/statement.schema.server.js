// statement schema will hold all the other schemas for the other types of statements, e.g., Numb
var mongoose = require("mongoose");

module.exports = function() {

    var NumberStatementSchema = require("./number-statement.schema.server")();

    var StatementSchema = mongoose.Schema({
        statementType   : {type : String, enum : ["NUMBER", "STRING", "DATE", "OBJECT", "DATABASE", "LOGIC", "DECISION"]},
        numberStatement : NumberStatementSchema
    });

    return StatementSchema;
};