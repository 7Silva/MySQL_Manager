'use strict';

import Errors from '../errorsClient.json' assert { type: 'json' };

/**
 * @description An easier way to return request errors.
 * 
 * @param {ExpressRequest<Function>} [req]
 * @param {ExpressResponse<Function>} [res]
 * @param {TypeError<Number>} [typeError]
 * @param {Code<Number>} [code]
 * 
 * @returns {Undefined} No specified value.
 */
class ExpressError {
  constructor(req, res, typeError, code) {
    if (!(String(typeError) in Errors)) throw new Error('This error code does not exist!');
    
    this.request = req.headers['user-agent'];
    Object.entries(Errors[String(typeError)])
      .map(([key, value]) => (this[key] = value));
      
    res.status(code).json(this);
  }
}

export default ExpressError;