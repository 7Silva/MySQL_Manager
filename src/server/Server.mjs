'use strict';

import ExpressError from '../structures/functions/ExpressError.mjs';
import Security from '../structures/functions/Security.mjs';
import Router from './routes/Router.mjs';

import { createServer } from 'node:http';
import express from 'express';
import bcrypt from 'bcryptjs';
import logger from 'morgan';
import cors from 'cors';

class Server {
  constructor() {
    this.application = express();
    this.server = createServer(this.application);
    
    this.port = process.env.PORT ?? 3000;
    this.security = new Security();
    this.cache = new Map();
    
    this.application
      .use(logger('common'))
      .use(this.security.rateLimit())
      .all('*', (req, res, next) => {
        let authorization = req.headers?.authorization;
        if (!authorization) return new ExpressError(req, res, 2001, 400);
        if (!bcrypt.compareSync(authorization, process.env.AUTHORIZATION)) return new ExpressError(req, res, 2001, 403);
        return next();
      })
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      
      .use('/api', new Router(this.cache))
      .get('/', (_, res) => res.sendStatus(200));
  }
  
  start() {
    this.server.listen(this.port,
      () => console.log('http://localhost:' +this.port));
  }
}

export default Server;