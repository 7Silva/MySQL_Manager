/*!
 * MySQL Manager
 * Copyright(c) 2020-2022 Bucky
 * Copyright(c) 2020-2022 Daniel T. Silva
 * Copyright(c) 2021-2022 Darkcompanny
 * Apache Licensed
 */

'use strict';

import { Sequelize } from 'sequelize'

/**
 * @description Create a connection to the MySQL database.
 * @param {Index<Number>} [index] Database position in Array which is located in .env.
 * @returns {MySQLDatabase<Object>} Returns all MySQL database options.
 */
class Database {
  constructor(index) {
    // Checking if a database list exists in the .env:
    if (!('DATABASES') in process.env) throw new Error();
    const databases = JSON.parse(process.env.DATABASES);
    
    // Making a check if this database position exists:
    if (isNaN(index)) throw new Error();
    if (!databases[index -1]) throw new Error();
    
    // Creating connection:
    return new Sequelize({
      database: databases[index -1]?.DATABASE,
      username: databases[index -1]?.USERNAME,
      password: databases[index -1]?.PASSWORD,
      host: databases[index -1]?.HOST,
      dialect: 'mysql', logging: false
    });
  }
}

export default Database;