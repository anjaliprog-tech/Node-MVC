const { HTTP_SUCCESS } = require('./config');

class GeneralResponse { 
    constructor(message,result,statusCode = "") { 
        this.message = message;
        this.statusCode = statusCode == "" ? HTTP_SUCCESS : statusCode;
        this.result = result;
    }
}

module.exports = {
    GeneralResponse,
}