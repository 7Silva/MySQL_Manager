/*!
 * MySQL Manager
 * Copyright(c) 2020-2022 Bucky
 * Copyright(c) 2020-2022 Daniel T. Silva
 * Copyright(c) 2021-2022 Darkcompany
 * Apache Licensed
 */

'use strict';

// Configuring dotenv and starting the server:
import 'dotenv/config';
import Server from './src/server/Server.mjs';
  new Server().start();