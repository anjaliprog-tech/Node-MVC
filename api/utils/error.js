const { HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_UN_AUTHORIZED, HTTP_SERVICE_NOT_AVAILABLE, HTTP_SERVER_ERROR } 
= require("./config");

class GeneralError extends Error {
  constructor(message, result = "", statusCode = "") {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.result = result === "" ? undefined : result;
  }
  getCode() {
    if (this instanceof BadRequest) {
      return HTTP_BAD_REQUEST;
    } else if (this instanceof NotFound) {
      return HTTP_NOT_FOUND;
    } else if (this instanceof UnAuthorized) {
      return HTTP_UN_AUTHORIZED;
    } else if (this instanceof ServiceNotAvailable) {
      return HTTP_SERVICE_NOT_AVAILABLE;
    }
    return HTTP_SERVER_ERROR;
  }
}
class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class UnAuthorized extends GeneralError {}
class ServiceNotAvailable extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  UnAuthorized,
  ServiceNotAvailable,
};