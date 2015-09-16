/**
 * Route Response utility
 * @module utilities/route-response
 * @requires lodash
 * @requires ./logger
 */
//------------------------------------------------------------
//	Module dependencies
//------------------------------------------------------------

var _      = require('lodash');

//------------------------------------------------------------
//	Module exports
//------------------------------------------------------------
/**
 * status
 * @type {Object}
 */
exports.status = {
  INFO: 'info',
  SUCCESS: 'success',
  WARN: 'warning',
  ERROR: 'error'
};

/**
 * Object to return a server response
 * @param res
 * @returns {RouteResponse}
 * @constructor
 */
function RouteResponse (res) {
  // Keep a reference to self
  var self = this;

  // Keep the response object
  var _res = res;

  // Response variables and defaults

  var _status      = exports.INFO;
  var _data        = null;
  var _message     = null;
  var _error       = null;

  /**
   * Function to set the status
   * @param status a String containing the status
   * @returns {RouteResponse}
   */
  self.setStatus = function (status) {
    _status = status;
    return self;
  };

  /**
   * Function to set the data
   * @param data JSON object containing the data
   * @param message optional message string
   * @returns {RouteResponse}
   */
  self.setData = function (data) {
    if (data && !_.isEmpty(data)) {
      _status = exports.status.SUCCESS;
    } else {
      _status = exports.status.WARN;
    }

    _data = data;
    return self;
  };

  /**
   * Function to set the message
   * @param message a String containing the message
   * @returns {RouteResponse}
   */
  self.setMessage = function (message) {
    _message = message;
    return self;
  };

  /**
   * Function to send the response
   * @param callback optional callback function that does not receive parameters
   */
  self.send = function (callback) {

    var obj = {
      status: _status,
      message: _message,
      data: _data,
      error: _error
    };

    console.log('Route Response utility sending: ' + JSON.stringify(obj));

    _res.jsonp(obj);

    if (arguments.length === 1 &&
      (_.isFunction(callback))) {
      callback();
    }
  };

  return self;
}


/**
 * Response utility
 * @type {RouteResponse}
 */
exports.response = RouteResponse;
