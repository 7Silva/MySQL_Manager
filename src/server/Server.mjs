/*!
 * MySQL Manager
 * Copyright(c) 2020-2022 Bucky
 * Copyright(c) 2020-2022 Daniel T. Silva
 * Copyright(c) 2021-2022 Darkcompany
 * Apache Licensed
 */

'use strict';

import ExpressError from '../structures/functions/ExpressError.mjs';
import Security from '../structures/functions/Security.mjs';
import Router from './routes/Router.mjs';

import { createServer } from 'node:http';
import express from 'express';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';

/**
 * @description A class to manage the server.
 */
class Server {
  constructor() {
    // Server creation:
    this.application = express();
    this.server = createServer(this.application);
    
    this.port = process.env.PORT ?? 3000;
    this.security = new Security();
    this.cache = new Map();
    
    // Defined routes and middlewares
    this.application
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(logger('common'))
      
      .use(helmet()).use(cors())
      .use(this.security.rateLimit())
      .use(this.security.average)
      .use(this.sqlInjection())
      
      .get('/', (_, res) => res.sendStatus(200))
      .all('/*', (req, res, next) => {
        let authorization = req.headers?.authorization;
        if (!authorization) return new ExpressError(req, res, 2001, 400);
        if (!bcrypt.compareSync(authorization, process.env.AUTHORIZATION)) return new ExpressError(req, res, 2001, 403);
        return next();
      })
      
      .use('/api', new Router(this.cache));
  }
  
  sqlInjection() {
    let isSqlInjection = (str) => !!([
        new RegExp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'i'),
        new RegExp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'i'),
        new RegExp('(%27)|(\')|(--)|(%23)|(#)', 'i'),
        new RegExp('(%27)|(\')|(--)|(%22)|(\")', 'i'),
        new RegExp('(%27)|(\')|(--)|(%60)|(\`)', 'i'),
        new RegExp('((%27)|(\'))union', 'i')
      ].map(i => i.test(str)).filter(Boolean).length);
      
    return ((req, res, next) => {
      if (isSqlInjection(req.url)) return res.status(403).end();
      return next();
    });
  }
  
  start() {
    this.server.listen(this.port,
      () => console.log('http://localhost:' +this.port));
  }
}

export default Server;