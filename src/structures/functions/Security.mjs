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

  disabled(next) {
    next();
  }

  minimum(req, res, next) {
    const country = location.lookup(req.connection.remoteAddress)?.country;

    switch (country) {
      case 'HK': return new ExpressError(req, res, 2003, 403); break;
      case 'RU': return new ExpressError(req, res, 2003, 403); break;
      case 'NL': return new ExpressError(req, res, 2003, 403); break;
      default: next(); break;
    }
  }

  average(req, res, next) {
    const userAgent = req.headers['user-agent'],
      country = location.lookup(req.connection.remoteAddress)?.country;

    switch (country) {
      case 'HK': return new ExpressError(req, res, 2003, 403); break;
      case 'RU': return new ExpressError(req, res, 2003, 403); break;
      case 'NL': return new ExpressError(req, res, 2003, 403); break;
      default: next(); break;
    }
    
    switch (userAgent) {
      case 'python':
        return 'Block';
        break;
    }
  }

  maximum(req, res, next) {
    const userAgent = req.headers['user-agent'],
      serverCountry = location.lookup(process.env.SERVER)?.country,
      country = location.lookup(req.connection.remoteAddress)?.country;

    if (country !== serverCountry) return new ExpressError(req, res, 2003, 403)
    else return next();

    if (userAgent !== process.env.USERAGENT) return new ExpressError(req, res, 2004, 403);
    else return next();
  }

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