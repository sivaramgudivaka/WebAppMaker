var mongoose = require("mongoose");

module.exports = function() {

    var DateStatementSchema = mongoose.Schema({
        dateOperation  : {type : String, enum : ["Create From String", "Get Date", 'Get Day', 'Get Full Year', 'Get Hours']},
        string         : String,
        format         : String,
        dateVariable   : String,
        resultVariable : String
    });

    return DateStatementSchema;
};