var mongoose = require("mongoose");

module.exports = function() {

    var DateStatementSchema = mongoose.Schema({
        dateOperation : {
            label: {type : String, enum : ["+", "-"]}
        },
        dateOperand1         : String,
        dateOperand2         : String,
        pickedDate1          : String,
        operand1Seconds      : String,
        operand1Minutes      : String,
        operand1Hours        : String,
        operand1Date         : String,
        operand1Month        : String,
        operand1Year         : String,
        pickedDate2          : String,
        operand2Seconds      : String,
        operand2Minutes      : String,
        operand2Hours        : String,
        operand2Date         : String,
        operand2Month        : String,
        operand2Year         : String,
        resultDateOperation  : String
    });

    return DateStatementSchema;
};