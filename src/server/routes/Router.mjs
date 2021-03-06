/*!
 * MySQL Manager
 * Copyright(c) 2020-2022 Bucky
 * Copyright(c) 2020-2022 Daniel T. Silva
 * Copyright(c) 2021-2022 Darkcompany
 * Apache Licensed
 */

'use strict';

import ExpressError from '../../structures/functions/ExpressError.mjs';
import QueryManager from '../../structures/database/QueryManager.mjs';
import Database from '../../structures/database/Sequelize.mjs';
import express from 'express';

/**
 * @description A class to manage the routes.
 */
class Router {
  constructor(cache) {
    // Creating express router.
    this.router = express.Router();

    this.router
      // Creating Get request to pull values.
      .get('/:database/select/:table', async (req, res) => {
        const params = req.params,
          db = this.resolveDatabase(params?.database, cache),
          values = await QueryManager.selectValues(db, params?.table, req.query);

        switch (values) {
          case 'Error 1001':
            new ExpressError(req, res, 1001, 502);
            break;

          case 'Error 1002':
            new ExpressError(req, res, 1002, 502);
            break;

          default: res.status(200).send(values); break;
        };
      })

      // Creating Post request to insert values.
      .post('/:database/insert/', async (req, res) => {
        let database = req.params?.database,
          body = req.body;

        if (
          !('table' in body) ||
          !('columns' in body) ||
          !('values' in body)) return new ExpressError(req, res, 1002, 400);

        let db = this.resolveDatabase(database, cache),
          queryInfo = await QueryManager.insertValues(db, body?.table, body?.columns, body?.values);

        switch (queryInfo) {
          case 'Error 1001':
            return new ExpressError(req, res, 1001, 502);
            break;

          case 'Error 1002':
            return new ExpressError(req, res, 1002, 502);
            break;

          case 'Error 1003':
            return new ExpressError(req, res, 1003, 502);
            break;

          case 'Error 1005':
            return new ExpressError(req, res, 1005, 502);
            break;
          case 'Error 1006': 
            return new ExpressError(req, res, 1006, 502);
            break;

          default:
            res.status(201).send(queryInfo);
            break;
        };
      })

      // Creating Post request to delete values.
      .delete('/:database/delete/', async (req, res) => {
        const database = req.params['database'],
          body = req.body;

        if (
          !('table' in body) ||
          !('value' in body)) return new ExpressError(req, res, 1002, 400);

        let
          db = this.resolveDatabase(database, cache),
          queryInfo = await QueryManager.deleteValues(db, body.table, body.value);

        switch (queryInfo) {
          case 'Error 1001':
            new ExpressError(req, res, 1001, 502);
            break;

          case 'Error 1002':
            new ExpressError(req, res, 1002, 502);
            break;

          case 'Error 1003':
            new ExpressError(req, res, 1003, 502);
            break;

          default:
            res.status(200).send(queryInfo);
            break;
        };
      })

    return this.router;
  }

  resolveDatabase(name, cache) {
    if (cache.has(name)) return cache.get(name);

    let db = new Database(name);
    cache.set(name, db);
    return db;
  }
}

export default Router;