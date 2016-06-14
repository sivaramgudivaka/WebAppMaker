// statement schema will hold all the other schemas for the other types of statements, e.g., Numb
var mongoose = require("mongoose");

module.exports = function() {

    var StatementSchema = mongoose.Schema({
        statementType   : {type : String, enum : ["NUMBER", "STRING", "DATE", "OBJECT", "ARRAY", "DATABASE", "BOOLEAN", "DECISION"]},
        variables: [String],
        title: String,
        numberStatement : require("./date-statement.schema.server")(),
        dateStatement : require("./date-statement.schema.server")()
    });

    return StatementSchema;
};