'use strict';

import { Sequelize } from 'sequelize'

class Database {
  constructor(index) {
    if (!('databases') in process.env) throw new Error();
    const databases = JSON.parse(process.env.DATABASES);
    
    if (isNaN(index)) throw new Error();
    if (!databases[index -1]) throw new Error();
    
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