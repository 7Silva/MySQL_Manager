/*!
 * MySQL Manager
 * Copyright(c) 2020-2022 Bucky
 * Copyright(c) 2020-2022 Daniel T. Silva
 * Copyright(c) 2021-2022 Darkcompany
 * Apache Licensed
 */

'use strict';

import errorsClient from '../errorsClient.json' assert { type: 'json' };
import ExpressError from './ExpressError.mjs';
import rateLimit from 'express-rate-limit';
import location from 'geoip-lite';

class Security {
  constructor(Agents, configs) {
    this.agent = Agents;
    this.conf = configs;
  }
  
  /**
   * @description Use this function to disable security.
   * @param {ExpressNext<Function>} [next] Function provided by express routes.
   * @returns {Undefined} No value defined.
   */
  disabled(next) { next(); }
  
  /**
   * @description Use to enable minimal protection!
   * 
   * @param {ExpressRequest<Function>} [req] Function provided by express routes.
   * @param {ExpressResponse<Function>} [res]  Function provided by express routes.
   * @param {ExpressNext<Function>} [next] Function provided by express routes.
   * 
   * @returns {Any} It can return any type of result.
   */
  minimum(req, res, next) {
    // Getting the request region:
    const country = location.lookup(req.connection.remoteAddress)?.country;
    
    // Making a handler of regions that are forbidden to access:
    switch (country) {
      case 'HK': return new ExpressError(req, res, 2003, 403); break;
      case 'RU': return new ExpressError(req, res, 2003, 403); break;
      case 'NL': return new ExpressError(req, res, 2003, 403); break;
      default: next(); break;
    }
  }
  
  /**
   * @description Used to activate medium protection.
   * 
   * @param {ExpressRequest<Function>} [req] Function provided by express routes.
   * @param {ExpressResponse<Function>} [res]  Function provided by express routes.
   * @param {ExpressNext<Function>} [next] Function provided by express routes.
   * 
   * @returns {Any} It can return any type of result.
   */
  average(req, res, next) {
    // Pulling the user-agent and the location of the request:
    const userAgent = req.headers['user-agent'],
      country = location.lookup(req.connection.remoteAddress)?.country;
      
    // Making a handler of regions that are forbidden to access:
    switch (country) {
      case 'HK': return new ExpressError(req, res, 2003, 403); break;
      case 'RU': return new ExpressError(req, res, 2003, 403); break;
      case 'NL': return new ExpressError(req, res, 2003, 403); break;
      default: next(); break;
    }
    
    // Making a handler of user-agent that are prohibited from accessing:
    switch (userAgent) {
      case 'python':
        return 'Block';
        break;
    }
  }
  
  /**
   * @description Used to activate maximum protection.
   * 
   * @param {ExpressRequest<Function>} [req] Function provided by express routes.
   * @param {ExpressResponse<Function>} [res]  Function provided by express routes.
   * @param {ExpressNext<Function>} [next] Function provided by express routes.
   * 
   * @returns {Any} It can return any type of result.
   */
  maximum(req, res, next) {
    // Pulling the user-agent, current server location and request location:
    const userAgent = req.headers['user-agent'],
      serverCountry = location.lookup(process.env.SERVER)?.country,
      country = location.lookup(req.connection.remoteAddress)?.country;
      
    /**
     * If the location of the request is different from the location of the server, it will be blocked.
     * If it is from the same location, the request will continue.
     */
    if (country !== serverCountry) return new ExpressError(req, res, 2003, 403)
    else return next();
    
    
    /**
     * Checking the user-agent is the same as defined in the .env.
     * If it is the same, the request will continue.
     */
    if (userAgent !== process.env.USERAGENT) return new ExpressError(req, res, 2004, 403);
    else return next();
  }
  
  /**
   * @description Used to limit some user from making multiple requests at a given time.
   * @returns {Any} It can return any type of result.
   */
  rateLimit() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 Minutes
      max: 20,
      message: errorsClient.Error3002,
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}

export default Security;